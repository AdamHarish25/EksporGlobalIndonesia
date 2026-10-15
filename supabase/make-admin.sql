-- ============================================================================
-- Jadikan user sebagai ADMIN / EDITOR (jalankan di SQL Editor, bypass RLS)
--
-- Langkah sebelumnya (Dashboard → Authentication → Users → Add user):
--   1. "Create new user" → isi email + password → centang "Auto Confirm User" → Save
--   2. Ganti GANTI_EMAIL_DISINI di bawah dengan email tersebut → Run
-- ============================================================================

insert into public.user_roles (user_id, role)
select id, 'admin' -- ganti 'admin' → 'editor' untuk peran editor
from auth.users
where email = 'GANTI_EMAIL_DISINI'
on conflict (user_id) do update set role = excluded.role;

-- Verifikasi:
-- select u.email, r.role from auth.users u left join public.user_roles r on r.user_id = u.id;
