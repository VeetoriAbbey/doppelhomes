export default function DashboardStat({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800 mt-2">
        {value}
      </p>
    </div>
  );
}
