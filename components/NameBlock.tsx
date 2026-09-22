"use client";

/**
 * O nome, em uma linha só. Um componente, usado na capa e no início.
 * O tamanho e a largura são idênticos nos dois lugares — por isso a viagem
 * entre eles é translação pura, sem distorcer a tipografia.
 */

export const NAME_TEXT = "MAGDIEL ERIC";
const NAME_LENGTH = NAME_TEXT.length;

/** Índice em que começa o sobrenome, que fica em contorno. */
const OUTLINE_FROM = NAME_TEXT.indexOf(" ") + 1;

/** Mesma classe nos dois lugares. Se mudar aqui, muda nos dois. */
export const NAME_CLASS =
  "block whitespace-nowrap font-display text-[21.2vw] uppercase leading-[0.86] tracking-[-0.045em] text-bone";

export default function NameBlock() {
  return (
    // `mx-auto` centraliza a caixa do nome.
    <span className={`${NAME_CLASS} mx-auto w-max select-none`}>
      {NAME_TEXT.split("").map((char, i) => (
        <span
          key={i}
          className={`inline-block whitespace-pre ${
            i >= OUTLINE_FROM ? "text-stroke" : ""
          } ${
            // O tracking negativo também vale DEPOIS da última letra e
            // encolhe a caixa, jogando o texto para fora do centro.
            i === NAME_LENGTH - 1 ? "tracking-normal" : ""
          }`}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
