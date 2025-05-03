
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserRole } from '@/contexts/AuthContext';

export const getDriverDetails = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('driver_details')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching driver details:', error);
    return null;
  }
};

export const updateProfile = async (userId: string, updates: {
  name?: string;
  contact_number?: string;
  profile_image?: string;
}) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
      
    if (error) throw error;
    
    toast.success('Profile updated successfully');
    return true;
  } catch (error: any) {
    toast.error(error.message || 'Failed to update profile');
    return false;
  }
};

export const checkVerificationStatus = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('driver_details')
      .select('is_verified, verification_status, verification_notes')
      .eq('user_id', userId)
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error checking verification status:', error);
    return {
      is_verified: false,
      verification_status: 'pending',
      verification_notes: null
    };
  }
};
