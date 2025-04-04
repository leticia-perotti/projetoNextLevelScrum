import { Module } from '@nestjs/common';
import { MensalidadeService } from './mensalidade.service';
import { MensalidadeController } from './mensalidade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensalidade } from './entities/mensalidade.entity';
import { Plano } from '../plano/entities/plano.entity';
import { Aluno } from 'src/alunos/entities/aluno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mensalidade, Aluno, Plano])],
  controllers: [MensalidadeController],
  providers: [MensalidadeService],
})
export class MensalidadeModule {}