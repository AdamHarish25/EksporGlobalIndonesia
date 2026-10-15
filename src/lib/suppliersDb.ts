import { supabase, isSupabaseConfigured } from '@/lib/supabase'

/* -------------------------------------------------------------------------- */
/*                              Types                                         */
/* -------------------------------------------------------------------------- */

export type SupplierStatus = 'new' | 'reviewed' | 'approved' | 'rejected'

export interface SupplierRegistration {
  id: string
  company_name: string
  company_type: string
  factory_location: string
  product: string
  product_details: string
  production_capacity: string
  moq: string
  packaging: string
  certifications: string
  export_experience: string
  website: string
  contact_name: string
  contact_email: string
  contact_phone: string
  message: string
  product_photos: string[]
  status: SupplierStatus
  created_at: string
  updated_at: string
}

export interface SupplierFormInput {
  companyName: string
  companyType: string
  factoryLocation: string
  product: string
  productDetails: string
  productionCapacity: string
  moq: string
  packaging: string
  certifications: string
  exportExperience: string
  website: string
  contactName: string
  contactEmail: string
  contactPhone: string
  message: string
}

export const MAX_PHOTOS = 5
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024 // 5 MB per foto

/* -------------------------------------------------------------------------- */
/*                              Public: submit                                */
/* -------------------------------------------------------------------------- */

/** Upload foto produk sebagai anon ke bucket supplier-photos. Return public URLs. */
export async function uploadSupplierPhotos(files: File[]): Promise<string[]> {
  const urls: string[] = []
  for (const file of files) {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
    const path = `registrations/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error } = await supabase.storage.from('supplier-photos').upload(path, file, {
      contentType: file.type || undefined,
    })
    if (error) throw new Error(`Upload foto gagal (${file.name}): ${error.message}`)
    // Bucket private → URL di-resolve saat dibaca editor via download/signed URL.
    // Simpan path; halaman admin memakai createSignedUrl untuk preview.
    urls.push(path)
  }
  return urls
}

/** Simpan registrasi supplier baru (anon, status 'new'). */
export async function submitSupplierRegistration(
  input: SupplierFormInput,
  photoPaths: string[],
): Promise<void> {
  const { error } = await supabase.from('supplier_registrations').insert({
    company_name: input.companyName.trim(),
    company_type: input.companyType,
    factory_location: input.factoryLocation.trim(),
    product: input.product.trim(),
    product_details: input.productDetails.trim(),
    production_capacity: input.productionCapacity.trim(),
    moq: input.moq.trim(),
    packaging: input.packaging.trim(),
    certifications: input.certifications.trim(),
    export_experience: input.exportExperience.trim(),
    website: input.website.trim(),
    contact_name: input.contactName.trim(),
    contact_email: input.contactEmail.trim(),
    contact_phone: input.contactPhone.trim(),
    message: input.message.trim(),
    product_photos: photoPaths,
    status: 'new',
  })
  if (error) throw new Error(error.message)
}

/* -------------------------------------------------------------------------- */
/*                              Admin (editor+)                               */
/* -------------------------------------------------------------------------- */

export async function fetchSupplierRegistrations(): Promise<SupplierRegistration[]> {
  const { data, error } = await supabase
    .from('supplier_registrations')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data ?? []) as SupplierRegistration[]
}

export async function updateSupplierStatus(id: string, status: SupplierStatus): Promise<void> {
  const { error } = await supabase.from('supplier_registrations').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteSupplierRegistration(id: string): Promise<void> {
  const { error } = await supabase.from('supplier_registrations').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

/** URL preview bertanda tangan (bucket private, hanya editor yang bisa panggil). */
export async function getSupplierPhotoUrl(path: string): Promise<string> {
  // Path baru (registrations/...) vs URL penuh lama — dukung keduanya.
  if (path.startsWith('http')) return path
  const { data, error } = await supabase.storage
    .from('supplier-photos')
    .createSignedUrl(path, 3600)
  if (error || !data) throw new Error(error?.message ?? 'Gagal membuat URL foto')
  return data.signedUrl
}

/** URL publik foto supplier (untuk direktori buyer; butuh policy sp_public_read). */
export function getSupplierPhotoPublicUrl(path: string): string {
  if (path.startsWith('http')) return path
  const { data } = supabase.storage.from('supplier-photos').getPublicUrl(path)
  return data.publicUrl
}

/** Baris direktori publik (view supplier_directory): hanya approved + kolom aman. */
export interface SupplierDirectoryRow {
  id: string
  company_name: string
  company_type: string
  factory_location: string
  product: string
  product_details: string
  production_capacity: string
  moq: string
  packaging: string
  certifications: string
  export_experience: string
  website: string
  contact_name: string
  contact_email: string
  contact_phone: string
  product_photos: string[]
  created_at: string
}

export async function fetchSupplierDirectory(): Promise<SupplierDirectoryRow[]> {
  const { data, error } = await supabase
    .from('supplier_directory')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data ?? []) as SupplierDirectoryRow[]
}

export { isSupabaseConfigured }
