import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimentoEstoque } from './entities/movimento-estoque.entity';
import { CreateMovimentoEstoqueDto } from './dto/create-movimento-estoque.dto';
import { UpdateMovimentoEstoqueDto } from './dto/update-movimento-estoque.dto';
@Injectable()
export class MovimentoEstoqueService {
  create(createMovimentoEstoqueDto: CreateMovimentoEstoqueDto) {
    return 'This action adds a new movimentoEstoque';
  }

  findAll() {
    return `This action returns all movimentoEstoque`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movimentoEstoque`;
  }

  update(id: number, updateMovimentoEstoqueDto: UpdateMovimentoEstoqueDto) {
    return `This action updates a #${id} movimentoEstoque`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimentoEstoque`;
  }
}
