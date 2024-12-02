import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SavedCode {
  id: string;
  name: string;
  data: Record<string, string[]>;
}

interface DeleteCodeDialogProps {
  codeToDelete: SavedCode | null;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteCodeDialog = ({ codeToDelete, onClose, onConfirm }: DeleteCodeDialogProps) => {
  return (
    <AlertDialog open={!!codeToDelete} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Code</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{codeToDelete?.name}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCodeDialog;