import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageRequest } from 'src/common/interface/page-request.interface';

import { FindManyOptions, In, Repository } from 'typeorm';
import {
  UpdateBulkMenuSettingItemDto,
  UpdateMenuSettingPriorityDto,
} from './controller/menu-setting.controller';
import { CreateMenuSettingDto } from './dto/create-menu-setting.dto';
import { MenuSettingEntity } from './entity/menu-setting.entity';

@Injectable()
export class MenuSettingService {
  constructor(
    @InjectRepository(MenuSettingEntity)
    private readonly menuSettingRepository: Repository<MenuSettingEntity>,
  ) {}

  async createMenuSetting(menuSettingDtos: CreateMenuSettingDto[]) {
    const menuSettings = await this.menuSettingRepository.create(
      menuSettingDtos,
    );
    for (const menuSettingIndex in menuSettings) {
      this.fillSettingMenuPriority(menuSettings[menuSettingIndex]);
    }

    await this.menuSettingRepository.save(menuSettings);
    return menuSettings;
  }

  private fillSettingMenuPriority(settingMenu: any) {
    if (!!!settingMenu.children) {
      return;
    }
    settingMenu.children = settingMenu.children.map((child, index) => ({
      ...child,
      priority: +index + 1,
    }));
    for (const child of settingMenu.children) {
      this.fillSettingMenuPriority(child);
    }
  }

  async updateBulk(updateBulkMenuSettingDtos: UpdateBulkMenuSettingItemDto[]) {
    //1. Get list menu setting id from body
    const menuSettingIds = updateBulkMenuSettingDtos.map(
      (menusetting) => menusetting.id,
    );
    const query: FindManyOptions<MenuSettingEntity> = {
      where: { id: In(menuSettingIds) },
    };

    //2. Get list exist menu settings
    const menuSettings = await this.menuSettingRepository.find(query);
    const existMenuSettingIds = menuSettings.map(
      (menusetting) => menusetting.id,
    );

    //3. Check if any question do not exist in dabatase
    const updateMenuSettingEntities = [];
    for (const menuSetting of updateBulkMenuSettingDtos) {
      if (existMenuSettingIds.indexOf(menuSetting.id) < 0) {
        throw new NotFoundException(`Menu ${menuSetting.id} not found.`);
      } else {
        this.fillSettingMenuPriority(menuSetting);
        updateMenuSettingEntities.push({
          id: menuSetting.id,
          ...menuSetting,
        });
      }
    }

    //4. Update question
    await this.menuSettingRepository.save(updateMenuSettingEntities);

    return updateMenuSettingEntities;
  }

  async findOne(menuSettingId: string) {
    const menuSetting = await this.menuSettingRepository.findOne({where:{id:menuSettingId}});
    if (!menuSetting) {
      throw new NotFoundException(`SettingMenu ${menuSettingId} not found.`);
    }
    const menuSettingTree = await this.menuSettingRepository.manager
      .getTreeRepository(MenuSettingEntity)
      .findDescendantsTree(menuSetting);
    this.sortQuestionChildren(menuSettingTree);
    return menuSettingTree;
  }

  private sortQuestionChildren(question: MenuSettingEntity) {
    if (!!!question.children) {
      return;
    }
    question.children = question.children.sort((a, b) =>
      a.priority > b?.priority ? 1 : -1,
    );
    for (const child of question.children) {
      this.sortQuestionChildren(child);
    }
  }

  async findAll(options: PageRequest) {
    const { pageNo, pageSize } = options;
    const menuSettingResponse = await this.menuSettingRepository.findAndCount({
      where: {
        parent: null,
      },
      order: {
        priority: 'ASC',
      },
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
    });
    console.log(menuSettingResponse[0])
    for (let question of menuSettingResponse[0]) {
      question = await this.menuSettingRepository.manager
        .getTreeRepository(MenuSettingEntity)
        .findDescendantsTree(question);

      this.sortQuestionChildren(question);
    }

    return menuSettingResponse;
  }

  async delete(questionId: string) {
    const deleteResponse = await this.menuSettingRepository.softDelete(
      questionId,
    );
    if (!deleteResponse.affected) {
      throw new NotFoundException(`Menu ${questionId} not found.`);
    }
  }

  async arrangePriority(
    updateCourseUnitPriorityDto: UpdateMenuSettingPriorityDto[],
  ) {
    //0. Standardized NodeTree to Array
    const arrayUpdateCourseUnitPriorityDto = [];
    nodeTreeToArray(
      updateCourseUnitPriorityDto,
      null,
      arrayUpdateCourseUnitPriorityDto,
    );

    //1. Standardized parameter
    const updateCourseUnitPriorities = {};
    const unitIds = [];
    for (const unitPriority of arrayUpdateCourseUnitPriorityDto) {
      updateCourseUnitPriorities[unitPriority['id']] = unitPriority['priority'];
      unitIds.push(unitPriority['id']);
    }

    //2. Get list course unit
    const query: FindManyOptions<MenuSettingEntity> = {
      where: { id: In(unitIds) },
    };

    const units = await this.menuSettingRepository.find(query);

    //3. Update priority
    for (const unit of units) {
      if (
        updateCourseUnitPriorities[unit.id] &&
        unit.priority !== updateCourseUnitPriorities[unit.id]
      ) {
        unit.priority = updateCourseUnitPriorities[unit.id];
      }
    }
    await this.menuSettingRepository.save(units);

    return updateCourseUnitPriorityDto;
  }
}

function nodeTreeToArray(
  nodes: UpdateMenuSettingPriorityDto[],
  parentId: string,
  output: any,
) {
  for (const nodeIndex in nodes) {
    const node = nodes[nodeIndex];

    //1. Push to flatten array
    output.push({
      priority: parseInt(nodeIndex) + 1,
      id: node.id,
      parentId,
    });

    //2. Set priority base on index
    nodes[nodeIndex].priority = parseInt(nodeIndex) + 1;

    if (node.children) {
      nodeTreeToArray(node.children, node.id, output);
    }
  }
}
