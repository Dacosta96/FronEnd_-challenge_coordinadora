const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6">
        <a href="#" className="text-gray-300 hover:text-white transition">
          Términos y Condiciones de Uso
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition">
          Política de Privacidad
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition">
          Aviso de Privacidad
        </a>
      </div>
      <p className="mt-2 text-gray-400">© Coordinadora 2025</p>
    </footer>
  );
};

export default Footer;
