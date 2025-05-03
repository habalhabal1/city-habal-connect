
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DriverProfile {
  name: string;
  email: string;
  contact_number?: string;
}

interface DriverApplication {
  id: string;
  user_id: string;
  license_number: string;
  license_expiry: string;
  vehicle_model: string;
  plate_number: string;
  is_verified: boolean;
  verification_status: string;
  verification_notes: string | null;
  verified_at: string | null;
  verified_by: string | null;
  created_at: string;
  updated_at: string;
  profiles: DriverProfile;
}

const DriverVerification = () => {
  const [applications, setApplications] = useState<DriverApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchDriverApplications();
  }, []);

  const fetchDriverApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('driver_details')
        .select(`
          *,
          profiles:user_id(name, email, contact_number)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        setApplications(data as unknown as DriverApplication[]);
      }
      
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching driver applications:', error);
      toast.error('Failed to load driver applications');
      setLoading(false);
    }
  };

  const handleVerificationAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      const currentUserId = (await supabase.auth.getSession()).data.session?.user.id;
      
      if (!currentUserId) {
        toast.error('You must be logged in to perform this action');
        return;
      }
      
      const updates = {
        is_verified: action === 'approve',
        verification_status: action === 'approve' ? 'approved' : 'rejected',
        verification_notes: notes[id] || null,
        verified_by: currentUserId,
        verified_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('driver_details')
        .update(updates)
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success(`Driver ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
      fetchDriverApplications();
    } catch (error: any) {
      toast.error(`Failed to ${action} driver: ${error.message}`);
    }
  };

  const handleNotesChange = (id: string, value: string) => {
    setNotes(prev => ({ ...prev, [id]: value }));
  };

  if (loading) {
    return <div>Loading driver applications...</div>;
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Driver Verification</CardTitle>
          <CardDescription>No pending driver applications</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Driver Verification</h2>
      
      {applications.map((application) => (
        <Card key={application.id} className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{application.profiles.name}</CardTitle>
              <Badge 
                variant={
                  application.verification_status === 'approved' ? 'outline' :
                  application.verification_status === 'rejected' ? 'destructive' : 
                  'default'
                }
              >
                {application.verification_status.toUpperCase()}
              </Badge>
            </div>
            <CardDescription>Applied on: {new Date(application.created_at).toLocaleDateString()}</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Driver Information</h3>
                <p><span className="font-medium">Email:</span> {application.profiles.email}</p>
                <p><span className="font-medium">Contact:</span> {application.profiles.contact_number || 'Not provided'}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Vehicle Details</h3>
                <p><span className="font-medium">Vehicle:</span> {application.vehicle_model}</p>
                <p><span className="font-medium">Plate Number:</span> {application.plate_number}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">License Information</h3>
                <p><span className="font-medium">License #:</span> {application.license_number}</p>
                <p><span className="font-medium">Expires:</span> {new Date(application.license_expiry).toLocaleDateString()}</p>
              </div>
              
              {application.verification_notes && (
                <div>
                  <h3 className="font-semibold mb-2">Verification Notes</h3>
                  <p>{application.verification_notes}</p>
                </div>
              )}
            </div>
            
            {application.verification_status === 'pending' && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Add Notes (Optional)</label>
                <Textarea
                  value={notes[application.id] || ''}
                  onChange={(e) => handleNotesChange(application.id, e.target.value)}
                  placeholder="Add verification notes here"
                  className="w-full"
                />
              </div>
            )}
          </CardContent>
          
          {application.verification_status === 'pending' && (
            <CardFooter className="bg-gray-50 dark:bg-gray-800 flex justify-end space-x-2">
              <Button 
                variant="destructive" 
                onClick={() => handleVerificationAction(application.id, 'reject')}
              >
                Reject
              </Button>
              <Button 
                onClick={() => handleVerificationAction(application.id, 'approve')}
              >
                Approve
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default DriverVerification;
