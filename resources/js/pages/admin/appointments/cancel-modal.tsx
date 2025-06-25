import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isAlreadyConfirmed: boolean;
}

export const CancelModal = ({ open, onConfirm, onCancel, isAlreadyConfirmed }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isAlreadyConfirmed ? "Ya está cancelada" : "Cancelar esta cita?"}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
          {!isAlreadyConfirmed && <Button onClick={onConfirm}>Cancelar</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
