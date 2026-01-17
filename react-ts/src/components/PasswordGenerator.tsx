import { useState } from "react";

type Options = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export default function PasswordGenerator() {
  const [password, setPassword] = useState<String>("");
  const [options, setOptions] = useState<Options>({
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  function generatePassword() {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const syms = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let chars = "";

    if (options.uppercase) chars += upper;
    if (options.lowercase) chars += lower;
    if (options.numbers) chars += nums;
    if (options.symbols) chars += syms;

    if (!chars) return;

    let result = "";
    for (let i = 0; i < options.length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(result);
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">

      {/* Título */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-slate-800">
          Password Generator
        </h1>
        <p className="text-sm text-slate-500">
          Crie senhas seguras em segundos
        </p>
      </div>

      {/* Senha */}
      <div className="bg-slate-100 rounded-lg p-3 text-center font-mono text-lg text-slate-700 break-all">
        {password || "Clique em gerar senha"}
      </div>

      {/* Tamanho */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Tamanho: {options.length}
        </label>
        <input
          type="range"
          min={6}
          max={32}
          value={options.length}
          onChange={(e) =>
            setOptions({ ...options, length: Number(e.target.value) })
          }
          className="w-full"
        />
      </div>

      {/* Opções */}
      <div className="space-y-2 text-sm">
        {[
          { key: "uppercase", label: "Letras maiúsculas" },
          { key: "lowercase", label: "Letras minúsculas" },
          { key: "numbers", label: "Números" },
          { key: "symbols", label: "Símbolos" },
        ].map((item) => (
          <label key={item.key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options[item.key as keyof Options] as boolean}
              onChange={(e) =>
                setOptions({
                  ...options,
                  [item.key]: e.target.checked,
                })
              }
            />
            {item.label}
          </label>
        ))}
      </div>

      {/* Botão */}
      <button
        onClick={generatePassword}
        className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold
                   hover:bg-indigo-700 transition-colors"
      >
        Gerar senha
      </button>

    </div>
  );
}