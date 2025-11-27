import { Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Tour } from './schemas/tour.schema';
import { ToursService } from './tours.service';
import { type Response } from 'express';

@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}

  @Get('top-5-cheap')
  aliasTopTour() {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response<Tour>> {
    const tours = await this.toursService.findAll();
    return res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.toursService.findOne(id);
  }

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
