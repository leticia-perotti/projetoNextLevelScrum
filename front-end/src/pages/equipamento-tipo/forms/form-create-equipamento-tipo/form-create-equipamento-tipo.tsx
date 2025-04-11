import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import { schema, FormData, postEquipamentoTipo } from './create-equipamento-tipo';

interface FormCreateEquipamentoTipoProps {
  onSave: () => void;
}

export default function FormCreateEquipamentoTipo({ onSave }: FormCreateEquipamentoTipoProps) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: '' },
  });

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) {
      Object.entries(errors).forEach(([, error]) => {
        if (error?.message) toast.error(error.message.toString());
      });
      return;
    }

    try {
      await postEquipamentoTipo(data);
      toast.success('Tipo de equipamento cadastrado com sucesso!');
      closeDialog();
      onSave();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Erro ao cadastrar.');
      } else {
        toast.error('Erro inesperado ao cadastrar.');
      }
    }
  };

  return (
    <>
      <Button className="bg-[#006FEE]/50 hover:bg-[#006FEE] text-white" onClick={openDialog}>
        Adicionar Tipo de Equipamento
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen} modal>
        <DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-1 border-[#2A2A2A]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Adicionar Tipo de Equipamento</DialogTitle>
              <DialogDescription>Informe o nome do tipo de equipamento.</DialogDescription>
            </DialogHeader>
            <Separator className="my-5" />
            <div className="grid gap-5 py-4">
              <div className="grid items-center gap-4">
                <Label htmlFor="nome">Nome</Label>
                <Controller
                  name="nome"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} className={cn('bg-[#1F1F1F] text-white', errors.nome && 'border-red-400')} />
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-[#006FEE] text-white">
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
