import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensalidade } from './entities/mensalidade.entity';
import { Aluno } from 'src/alunos/entities/aluno.entity';
import { Plano } from 'src/plano/entities/plano.entity';
import { CreateMensalidadeDto } from './dto/create-mensalidade.dto';


@Injectable()
export class MensalidadeService {
  constructor(
    @InjectRepository(Mensalidade)
    private readonly mensalidadeRepository: Repository<Mensalidade>,

    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,

    @InjectRepository(Plano)
    private readonly planoRepository: Repository<Plano>,
  ) {}

  async criarMensalidade(createMensalidadeDto: CreateMensalidadeDto) {
    try{
      const id = createMensalidadeDto.id
      const matricula = createMensalidadeDto.matricula
      const aluno = await this.alunoRepository.findOneBy({ matricula: matricula });
      const plano = await this.planoRepository.findOne({ where: { id: id } });
      const vencimento = aluno?.diaVencimento
      if (!aluno || !plano) throw new NotFoundException('Aluno ou plano não encontrado');
    
      const nova = this.mensalidadeRepository.create({
        aluno,
    plano,
    valor: plano.valor,
    vencimento,
    pago: createMensalidadeDto.pago,
    dataPagamento: createMensalidadeDto.dataPagamento
      });
    
      const aux = await this.mensalidadeRepository.save(nova);
      return (`Mensalidade do aluno ${aux.aluno.nome} paga com sucesso`) 
    }catch(error){
      throw new InternalServerErrorException(error.message);
    }
   
  }

  async listarTodas() {
    return this.mensalidadeRepository.find({ relations: ['aluno', 'plano'] });
  }

  

 /* async gerarComprovante(id: number) {
    const mensalidade = await this.mensalidadeRepository.findOne({
      where: { id },
      relations: ['aluno', 'plano'],
    });

    if (!mensalidade) throw new NotFoundException('Mensalidade não encontrada');

    return {
      aluno: mensalidade.aluno.nome,
      plano: mensalidade.plano.nome,
      valor: mensalidade.valor,
      vencimento: mensalidade.vencimento,
      pago: mensalidade.pago,
      dataPagamento: mensalidade.dataPagamento ?? 'Ainda não pago',
    };
  }*/
}