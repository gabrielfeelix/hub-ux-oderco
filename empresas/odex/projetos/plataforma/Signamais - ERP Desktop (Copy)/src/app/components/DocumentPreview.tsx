import React from 'react';

export function DocumentPreview() {
  return (
    <div className="bg-white rounded-2xl shadow-[0px_0px_36px_0px_rgba(225,227,235,0.4)] w-full max-w-[800px] mx-auto min-h-[1000px] p-[40px] md:p-[60px] lg:p-[100px] text-[#0e0f11]">
      <div className="flex flex-col items-center gap-[40px] w-full">
        <h2 className="text-[20px] font-[Lufga,sans-serif] font-bold text-center">
          CONTRATO DE LOCAÇÃO RESIDENCIAL
        </h2>
        
        <div className="flex flex-col gap-[8px] text-[14px] md:text-[16px] font-['Inter',sans-serif] leading-[40px] w-full text-justify">
          <p>LOCADOR: João Silva, brasileiro, casado, CPF: 123.456.789-00, RG: 1.234.567 SSP/SP, residente à Rua das Flores, nº 100, Bairro Centro, Cidade São Paulo/SP.</p>
          <p>LOCATÁRIO: Maria Oliveira, brasileira, solteira, CPF: 987.654.321-00, RG: 7.654.321 SSP/SP, residente à Rua das Palmeiras, nº 200, Bairro Jardim, Cidade São Paulo/SP.</p>
          <p>IMÓVEL LOCADO: Apartamento localizado à Rua das Amendoeiras, nº 50, Apto 301, Bairro Bela Vista, Cidade São Paulo/SP, CEP: 01000-000.</p>
          
          <p className="mt-4">1. DO OBJETO</p>
          <p>O presente contrato tem como objeto a locação do imóvel acima descrito, de propriedade do LOCADOR, que se destina exclusivamente ao uso residencial.</p>
          
          <p className="mt-4">2. DO PRAZO</p>
          <p>O prazo de locação é de 12 (doze) meses, com início em 1º de dezembro de 2024 e término em 30 de novembro de 2025, podendo ser prorrogado por acordo entre as partes.</p>
          
          <p className="mt-4">3. DO VALOR DO ALUGUEL</p>
          <p>O valor mensal do aluguel é de R$ 1.500,00 (mil e quinhentos reais), a ser pago até o dia 5 (cinco) de cada mês, por transferência bancária para a conta do LOCADOR, Banco XYZ, Agência: 1234, Conta Corrente: 56789-0.</p>
          
          <p className="mt-4">4. DOS ENCARGOS</p>
          <p>Ficarão a cargo do LOCATÁRIO todas as despesas relativas ao consumo de água, luz, gás, internet, e eventuais taxas de condomínio, além de realizar a manutenção do imóvel em bom estado.</p>
          
          <p className="mt-4">5. DA MULTA POR RESCISÃO ANTECIPADA</p>
          <p>Em caso de rescisão antecipada por iniciativa do LOCATÁRIO, será aplicada uma multa equivalente a 3 (três) meses de aluguel, proporcional ao tempo restante do contrato.</p>
          
          <p className="mt-4">6. DAS OBRIGAÇÕES DO LOCATÁRIO</p>
          <p>O LOCATÁRIO compromete-se a:</p>
          <ul className="list-disc ml-6">
            <li>Não sublocar o imóvel sem autorização prévia por escrito do LOCADOR.</li>
            <li>Manter o imóvel em bom estado de conservação.</li>
            <li>Devolver o imóvel nas mesmas condições em que o recebeu, salvo desgaste natural.</li>
          </ul>
          
          <p className="mt-4">7. DAS OBRIGAÇÕES DO LOCADOR</p>
          <p>O LOCADOR compromete-se a:</p>
          <ul className="list-disc ml-6">
            <li>Entregar o imóvel em boas condições de uso.</li>
            <li>Garantir ao LOCATÁRIO o uso pacífico do imóvel durante o prazo de locação.</li>
          </ul>
          
          <p className="mt-4">8. DISPOSIÇÕES GERAIS</p>
          <p>Qualquer alteração neste contrato somente será válida se feita por escrito e assinada por ambas as partes.</p>
          
          <p className="mt-4">9. DO FORO</p>
          <p>Fica eleito o Foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias oriundas deste contrato.</p>
          
          <p className="mt-8">E, por estarem de acordo, as partes assinam o presente contrato em duas vias de igual teor.</p>
          <p>São Paulo/SP, 10 de novembro de 2024.</p>
          
          <div className="mt-12 flex flex-col gap-12">
            <div>
              <p>__________________________________</p>
              <p>João Silva (Locador)</p>
            </div>
            <div>
              <p>__________________________________</p>
              <p>Maria Oliveira (Locatária)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
