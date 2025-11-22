import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ToursService } from './tours.service';

@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}

  @Get()
  aliasTopTour() {}

  @Get()
  findAll() {}

  @Get()
  findOne() {}

  @Post()
  create() {}

  @Patch()
  update() {}

  @Delete()
  delete() {}

  @Get()
  stats() {}

  @Get()
  monthlyPlan() {}
}
