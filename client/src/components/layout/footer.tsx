export default function Footer() {
  return (
    <footer className="bg-[#007bff] text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-lg font-medium italic">
            "Comprometidos con la excelencia médica y el bienestar de nuestra comunidad"
          </p>
          <p className="mt-4 text-sm text-white/80">
            © {new Date().getFullYear()} Colegio de Médicos de la Provincia de Buenos Aires. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
