import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Tour } from './schemas/tour.schema';
import { ToursService } from './tours.service';

@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}

  @Get('top-5-cheap')
  aliasTopTour() {}

  @Get()
  async findAll(): Promise<Tour[]> {
    return this.toursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Post()
  create() {}

  @Patch(':id')
  update(@Param('id') id: string) {}

  @Delete(':id')
  delete(@Param('id') id: string) {}

  @Get('tours-stats')
  stats() {}

  @Get('monthly-plan/:year')
  monthlyPlan(@Param('year') year: string) {}
}
