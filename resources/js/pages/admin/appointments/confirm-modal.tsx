import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isAlreadyConfirmed: boolean;
}

export const ConfirmModal = ({ open, onConfirm, onCancel, isAlreadyConfirmed }: ConfirmModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isAlreadyConfirmed ? "Ya está confirmada" : "¿Confirmar esta cita?"}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
          {!isAlreadyConfirmed && <Button onClick={onConfirm}>Confirmar</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
