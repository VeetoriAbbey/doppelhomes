import { Building2, Home, Briefcase } from "lucide-react";

export default function PropertyStat() {
  return (
    <section className="w-full py-16 px-6 md:px-20 bg-gray-50 gap-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
        
        {/* Landed Properties Sold */}
        <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-blue-200 hover:shadow-lg transition">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-100 mb-6">
            <Home className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-4xl font-bold text-gray-900">200+</h3>
          <p className="mt-2 text-gray-600">
            Landed Properties Sold
          </p>
        </div>

        {/* Ongoing Projects */}
        <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-blue-200 hover:shadow-lg transition">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 mb-6">
            <Building2 className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-4xl font-bold text-gray-900">50+</h3>
          <p className="mt-2 text-gray-600">
            Ongoing Projects
          </p>
        </div>

        {/* Affiliated Companies */}
        <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-blue-200 hover:shadow-lg transition">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 mb-6">
            <Briefcase className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-4xl font-bold text-gray-900">100+</h3>
          <p className="mt-2 text-gray-600">
            Affiliated Companies
          </p>
        </div>

      </div>
    </section>
  );
}
