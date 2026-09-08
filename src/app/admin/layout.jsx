import './admin.css';

export const metadata = {
  title: 'Admin Dashboard | Biker King Adventure',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="admin-root">{children}</div>;
}
