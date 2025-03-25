
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface BaseEditorProps<T> {
  title: string;
  isLoading: boolean;
  isError: boolean;
  data: T | undefined;
  onSave: (data: T) => Promise<void>;
  renderForm: (data: T, onChange: (updatedData: T) => void) => React.ReactNode;
}

export function BaseEditor<T>({
  title,
  isLoading,
  isError,
  data,
  onSave,
  renderForm
}: BaseEditorProps<T>) {
  const [editedData, setEditedData] = React.useState<T | undefined>(data);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  // Update local state when data changes
  React.useEffect(() => {
    if (data) {
      setEditedData(data);
    }
  }, [data]);

  const handleSave = async () => {
    if (!editedData) return;
    
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    
    try {
      await onSave(editedData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading {title.toLowerCase()}. Please refresh the page and try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!editedData) {
    return (
      <Alert>
        <AlertDescription>
          No {title.toLowerCase()} data found. Please refresh the page or contact support.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      
      {saveSuccess && (
        <Alert>
          <AlertDescription className="text-green-600">
            Changes saved successfully!
          </AlertDescription>
        </Alert>
      )}
      
      {saveError && (
        <Alert variant="destructive">
          <AlertDescription>{saveError}</AlertDescription>
        </Alert>
      )}
      
      {renderForm(editedData, setEditedData)}
    </div>
  );
}
