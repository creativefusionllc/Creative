-- Create promo_banners table for CMS management
create table if not exists public.promo_banners (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  subtitle text,
  description text,
  cta_text text default 'Learn More',
  cta_link text,
  background_color text default '#C4D600',
  text_color text default '#1f2937',
  position text default 'bottom' check (position in ('top', 'bottom', 'floating')),
  is_active boolean default true,
  show_form boolean default false,
  form_type text default 'inquiry' check (form_type in ('inquiry', 'consultation', 'booking')),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id)
);

-- Add RLS policies
alter table public.promo_banners enable row level security;

-- Allow public to view active banners
create policy "Anyone can view active promo banners"
  on public.promo_banners for select
  using (is_active = true);

-- Allow super admins to manage banners
create policy "Super admins can manage promo banners"
  on public.promo_banners for all
  using (auth.jwt() ->> 'user_role' = 'Super Admin')
  with check (auth.jwt() ->> 'user_role' = 'Super Admin');

-- Create index for faster queries
create index idx_promo_banners_position_active on public.promo_banners(position, is_active);
