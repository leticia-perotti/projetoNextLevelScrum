import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendaProduto } from './entities/venda-produto.entity';
import { CreateVendaProdutoDto } from './dto/create-venda-produto.dto';
import { UpdateVendaProdutoDto } from './dto/update-venda-produto.dto';
@Injectable()
export class VendaProdutoService {
  create(createVendaProdutoDto: CreateVendaProdutoDto) {
    return 'This action adds a new vendaProduto';
  }

  findAll() {
    return `This action returns all vendaProduto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vendaProduto`;
  }

  update(id: number, updateVendaProdutoDto: UpdateVendaProdutoDto) {
    return `This action updates a #${id} vendaProduto`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendaProduto`;
  }
}
