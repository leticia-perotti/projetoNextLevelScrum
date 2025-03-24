import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunosService } from './alunos.service';
import { AlunosController } from './alunos.controller';
import { Aluno } from './entities/aluno.entity';  

@Module({
  imports: [TypeOrmModule.forFeature([Aluno])],  
  controllers: [AlunosController],
  providers: [AlunosService],
})
export class AlunosModule {}
