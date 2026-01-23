export default function DashboardHeader({ user }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user.name}
        </h1>
        <p className="text-sm text-gray-500">
          Affiliate Dashboard
        </p>
      </div>

      <div className="bg-blue-50 px-4 py-2 rounded-lg text-sm text-blue-700">
        Commission Rate: <strong>{user.commissionRate}%</strong>
      </div>
    </div>
  );
}
