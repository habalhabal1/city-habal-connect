
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface DriverApplication {
  id: string;
  user_id: string;
  license_number: string;
  license_expiry: string;
  vehicle_model: string;
  plate_number: string;
  is_verified: boolean;
  verification_status: string;
  verification_notes?: string;
  created_at: string;
  updated_at: string;
  profiles: {
    name: string;
    email: string;
    contact_number?: string;
  }
}

const DriverVerification = () => {
  const [applications, setApplications] = useState<DriverApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<DriverApplication | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [action, setAction] = useState<'approve' | 'reject'>('approve');
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchDriverApplications();
  }, []);

  const fetchDriverApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('driver_details')
        .select(`
          *,
          profiles:user_id (
            name,
            email,
            contact_number
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching driver applications:', error);
      toast.error('Failed to load driver applications');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!selectedDriver) return;
    
    try {
      const { error } = await supabase
        .from('driver_details')
        .update({
          is_verified: action === 'approve',
          verification_status: action === 'approve' ? 'approved' : 'rejected',
          verification_notes: notes,
          verified_by: currentUser?.id,
          verified_at: new Date().toISOString(),
        })
        .eq('id', selectedDriver.id);

      if (error) {
        throw error;
      }

      toast.success(`Driver ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
      setDialogOpen(false);
      setSelectedDriver(null);
      setNotes('');
      
      // Refresh the list
      await fetchDriverApplications();
    } catch (error) {
      console.error('Error updating driver verification:', error);
      toast.error(`Failed to ${action} driver`);
    }
  };

  const openDialog = (driver: DriverApplication, actionType: 'approve' | 'reject') => {
    setSelectedDriver(driver);
    setAction(actionType);
    setNotes('');
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Driver Applications</CardTitle>
          <CardDescription>Review and verify driver applications</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-6">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No driver applications found
            </div>
          ) : (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">
                        {driver.profiles?.name}
                        <div className="text-xs text-muted-foreground">{driver.profiles?.email}</div>
                      </TableCell>
                      <TableCell>{driver.profiles?.contact_number || 'N/A'}</TableCell>
                      <TableCell>
                        <div>{driver.vehicle_model}</div>
                        <div className="text-xs text-muted-foreground">Plate: {driver.plate_number}</div>
                      </TableCell>
                      <TableCell>
                        <div>{driver.license_number}</div>
                        <div className="text-xs text-muted-foreground">
                          Expires: {format(new Date(driver.license_expiry), 'MMM d, yyyy')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            driver.verification_status === 'approved' ? 'success' :
                            driver.verification_status === 'rejected' ? 'destructive' : 'default'
                          }
                        >
                          {driver.verification_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {driver.verification_status === 'pending' && (
                          <div className="flex justify-end space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => openDialog(driver, 'approve')}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" /> Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => openDialog(driver, 'reject')}
                            >
                              <XCircle className="w-4 h-4 mr-1" /> Reject
                            </Button>
                          </div>
                        )}
                        {driver.verification_status !== 'pending' && (
                          <Button size="sm" variant="ghost" onClick={() => openDialog(driver, driver.verification_status === 'approved' ? 'reject' : 'approve')}>
                            <AlertCircle className="w-4 h-4 mr-1" /> Change Status
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === 'approve' ? 'Approve' : 'Reject'} Driver Application
            </DialogTitle>
            <DialogDescription>
              {action === 'approve' 
                ? 'This will approve the driver to start accepting ride requests.'
                : 'This will reject the driver application.'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDriver && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium">Driver</p>
                  <p className="text-sm">{selectedDriver.profiles?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Vehicle</p>
                  <p className="text-sm">{selectedDriver.vehicle_model}</p>
                </div>
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-1">
                  Notes (Optional)
                </label>
                <Textarea
                  id="notes"
                  placeholder={action === 'approve' ? "Any notes for approval..." : "Reason for rejection..."}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleVerification}
              variant={action === 'approve' ? 'default' : 'destructive'}
            >
              {action === 'approve' ? 'Approve Driver' : 'Reject Driver'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriverVerification;
