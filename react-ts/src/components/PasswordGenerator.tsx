import { useState } from "react";

function PasswordGenerator() {
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Função para gerar senha
  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let generated = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generated += chars[randomIndex];
    }
    setPassword(generated);
    setCopied(false)
  };

  // Função para copiar senha
  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); //feedback some depois de 2s
    }
  };

  // Função para avaliar força da senha
  const getStrength = (password: string): string => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return "Fraca";
    if (strength === 2) return "Média";
    return "Forte";
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold">Gerador de Senhas</h2>

      {/* Configurações */}
      <div className="flex flex-col gap-3 w-full">
        <label>
          Comprimento: <span className="font-semibold">{length}</span>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Incluir Letras Maiúsculas
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Incluir Números
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Incluir Símbolos
        </label>
      </div>

      {/* Botão Gerar */}
      <button
        onClick={generatePassword}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
        Gerar Senha </button>

      {/* Exibição da senha */}
      {password && (
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex justify-between items-center w-full bg-white rounded-lg shadow px-4 py-2 font-mono text-lg">
            <span className="truncate">{password}</span>
            <button
              onClick={copyToClipboard}
              className="ml-4 px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>

          {/* Força da senha */}
          <p className="text-sm">
            Força da senha:{" "}
            <span
              className={`font-bold ${
                getStrength(password) === "Fraca"
                  ? "text-red-500"
                  : getStrength(password) === "Média"
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              {getStrength(password)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;