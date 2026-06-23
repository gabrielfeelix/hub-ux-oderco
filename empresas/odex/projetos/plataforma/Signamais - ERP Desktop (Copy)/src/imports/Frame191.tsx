import svgPaths from "./svg-1lmh5rr4zv";

function ArrowForward() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow_forward">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow_forward">
          <mask height="16" id="mask0_3_3082" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="16" id="Bounding box" width="16" />
          </mask>
          <g mask="url(#mask0_3_3082)">
            <path d={svgPaths.p31499900} fill="var(--fill-0, #8925E2)" id="arrow_forward_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="breadcrumb">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#cf9dfc] text-[14px]">Documentos</p>
      <ArrowForward />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8925e2] text-[14px]">Novo Envelope</p>
    </div>
  );
}

function HelpOutline() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Help outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_3_3074)" id="Help outline">
          <g id="Vector" />
          <path d={svgPaths.p31b60c00} fill="var(--fill-0, #6D7379)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_3_3074">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['Lufga:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0e0f11] text-[36px]">Novo Envelope</p>
      <HelpOutline />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Breadcrumb />
      <Frame18 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative">
      <Frame8 />
    </div>
  );
}

function Paid() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="paid">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="paid">
          <mask height="24" id="mask0_3_1416" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_1416)">
            <path d={svgPaths.p2e71c00} fill="var(--fill-0, #495057)" id="paid_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Paid />
      <p className="font-['Poppins:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#393939] text-[0px] text-[16px] text-center">
        <span className="font-['Poppins:Regular',sans-serif] leading-[normal] text-[#6d7379]">Créditos:</span>
        <span className="leading-[normal] text-[#0e0f11]">{` `}</span>
        <span className="leading-[normal] text-[#6b1db0]">25</span>
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#f5f4f7] content-stretch flex items-center justify-center p-[16px] relative rounded-[1000px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[1000px]" />
      <Frame1 />
    </div>
  );
}

function Add() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="add">
          <mask height="24" id="mask0_3_3058" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_3058)">
            <path d={svgPaths.p2fd7c000} fill="var(--fill-0, #6D7379)" id="add_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[#abafb2] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6d7379] text-[16px]">Adicionar Documento</p>
      <Add />
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check">
          <mask height="24" id="mask0_3_3070" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_3070)">
            <path d={svgPaths.p1cdb8180} fill="var(--fill-0, #8925E2)" id="check_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[#8925e2] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8925e2] text-[16px]">Enviar sem posicionar</p>
      <Check />
    </div>
  );
}

function Check1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check">
          <mask height="24" id="mask0_3_2227" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_2227)">
            <path d={svgPaths.p1cdb8180} fill="var(--fill-0, white)" id="check_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#8925e2] content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[16px] text-white">Enviar</p>
      <Check1 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame />
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex gap-[16px] items-end justify-end relative shrink-0 w-full z-[2]" data-name="Title">
      <Frame22 />
      <Frame7 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[8px] items-start relative shrink-0 text-[16px] w-full">
      <div className="flex flex-col justify-center relative shrink-0 text-[#0e0f11] w-full whitespace-pre-wrap">
        <p className="leading-[40px] mb-0">LOCADOR: João Silva, brasileiro, casado, CPF: 123.456.789-00, RG: 1.234.567 SSP/SP, residente à Rua das Flores, nº 100, Bairro Centro, Cidade São Paulo/SP.</p>
        <p className="leading-[40px] mb-0">LOCATÁRIO: Maria Oliveira, brasileira, solteira, CPF: 987.654.321-00, RG: 7.654.321 SSP/SP, residente à Rua das Palmeiras, nº 200, Bairro Jardim, Cidade São Paulo/SP.</p>
        <p className="leading-[40px] mb-0">IMÓVEL LOCADO: Apartamento localizado à Rua das Amendoeiras, nº 50, Apto 301, Bairro Bela Vista, Cidade São Paulo/SP, CEP: 01000-000.</p>
        <p className="leading-[40px] mb-0">1. DO OBJETO</p>
        <p className="leading-[40px] mb-0">O presente contrato tem como objeto a locação do imóvel acima descrito, de propriedade do LOCADOR, que se destina exclusivamente ao uso residencial.</p>
        <p className="leading-[40px] mb-0">2. DO PRAZO</p>
        <p className="leading-[40px] mb-0">O prazo de locação é de 12 (doze) meses, com início em 1º de dezembro de 2024 e término em 30 de novembro de 2025, podendo ser prorrogado por acordo entre as partes.</p>
        <p className="leading-[40px] mb-0">3. DO VALOR DO ALUGUEL</p>
        <p className="leading-[40px] mb-0">O valor mensal do aluguel é de R$ 1.500,00 (mil e quinhentos reais), a ser pago até o dia 5 (cinco) de cada mês, por transferência bancária para a conta do LOCADOR, Banco XYZ, Agência: 1234, Conta Corrente: 56789-0.</p>
        <p className="leading-[40px] mb-0">4. DOS ENCARGOS</p>
        <p className="leading-[40px] mb-0">Ficarão a cargo do LOCATÁRIO todas as despesas relativas ao consumo de água, luz, gás, internet, e eventuais taxas de condomínio, além de realizar a manutenção do imóvel em bom estado.</p>
        <p className="leading-[40px] mb-0">5. DA MULTA POR RESCISÃO ANTECIPADA</p>
        <p className="leading-[40px] mb-0">Em caso de rescisão antecipada por iniciativa do LOCATÁRIO, será aplicada uma multa equivalente a 3 (três) meses de aluguel, proporcional ao tempo restante do contrato.</p>
        <p className="leading-[40px] mb-0">6. DAS OBRIGAÇÕES DO LOCATÁRIO</p>
        <p className="leading-[40px] mb-0">O LOCATÁRIO compromete-se a:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[24px]">
            <span className="leading-[40px]">Não sublocar o imóvel sem autorização prévia por escrito do LOCADOR.</span>
          </li>
          <li className="mb-0 ms-[24px]">
            <span className="leading-[40px]">Manter o imóvel em bom estado de conservação.</span>
          </li>
          <li className="ms-[24px]">
            <span className="leading-[40px]">Devolver o imóvel nas mesmas condições em que o recebeu, salvo desgaste natural.</span>
          </li>
        </ul>
        <p className="leading-[40px] mb-0">7. DAS OBRIGAÇÕES DO LOCADOR</p>
        <p className="leading-[40px] mb-0">O LOCADOR compromete-se a:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[24px]">
            <span className="leading-[40px]">Entregar o imóvel em boas condições de uso.</span>
          </li>
          <li className="ms-[24px]">
            <span className="leading-[40px]">Garantir ao LOCATÁRIO o uso pacífico do imóvel durante o prazo de locação.</span>
          </li>
        </ul>
        <p className="leading-[40px] mb-0">8. DISPOSIÇÕES GERAIS</p>
        <p className="leading-[40px] mb-0">Qualquer alteração neste contrato somente será válida se feita por escrito e assinada por ambas as partes.</p>
        <p className="leading-[40px] mb-0">9. DO FORO</p>
        <p className="leading-[40px] mb-0">Fica eleito o Foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias oriundas deste contrato.</p>
        <p className="leading-[40px] mb-0">E, por estarem de acordo, as partes assinam o presente contrato em duas vias de igual teor.</p>
        <p className="leading-[40px] mb-0">São Paulo/SP, 10 de novembro de 2024.</p>
        <p className="leading-[40px] mb-0">
          __________________________________
          <br aria-hidden="true" />
          João Silva (Locador)
        </p>
        <p className="leading-[40px]">
          __________________________________
          <br aria-hidden="true" />
          Maria Oliveira (Locatária)
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#6d7379] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Formatos suportados: .pdf e .doc</p>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] shadow-[0px_0px_36px_0px_rgba(225,227,235,0.4)]" data-name="1">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center leading-[0] not-italic p-[40px] relative w-full">
          <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center relative shrink-0 text-[#0e0f11] text-[20px] text-center w-full">
            <p className="leading-[normal] whitespace-pre-wrap">CONTRATO DE LOCAÇÃO RESIDENCIAL</p>
          </div>
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#f6f8fa] flex-[1_0_0] h-[1004px] min-h-px min-w-px relative rounded-[16px]">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center p-[100px] relative size-full">
          <Component />
        </div>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[10000px] shrink-0 size-[24px]" data-name="2">
      <div aria-hidden="true" className="absolute border-2 border-[#9729f8] border-solid inset-0 pointer-events-none rounded-[10000px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8925e2] text-[16px] text-center w-[7px] whitespace-pre-wrap">2</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Component1 />
      <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Signatários</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[#abafb2] text-[16px] whitespace-pre-wrap">Insira um nome</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f5f4f7] flex-[1_0_0] h-[56px] min-h-px min-w-px relative rounded-[16px]" data-name="input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[16px] relative size-full">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Input1 />
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="input">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#42494f] text-[16px] w-full whitespace-pre-wrap">Nome</p>
      <Frame4 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[#abafb2] text-[16px] whitespace-pre-wrap">email@gmail.com</p>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#f5f4f7] flex-[1_0_0] h-[56px] min-h-px min-w-px relative rounded-[16px]" data-name="input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[16px] relative size-full">
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Input3 />
    </div>
  );
}

function Input2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="input">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#42494f] text-[16px] w-full whitespace-pre-wrap">E-mail</p>
      <Frame5 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Input />
      <Input2 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#858a8e] text-[16px]">1º Signatário</p>
      <Frame10 />
    </div>
  );
}

function Add1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="add">
          <mask height="24" id="mask0_3_3058" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_3058)">
            <path d={svgPaths.p2fd7c000} fill="var(--fill-0, #6D7379)" id="add_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[#abafb2] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6d7379] text-[16px]">Novo Signatário</p>
      <Add1 />
    </div>
  );
}

function Check2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check">
          <mask height="24" id="mask0_3_3070" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_3070)">
            <path d={svgPaths.p1cdb8180} fill="var(--fill-0, #8925E2)" id="check_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[#8925e2] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8925e2] text-[16px]">Salvar</p>
      <Check2 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame15 />
      <Frame21 />
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[10000px] shrink-0 size-[24px]" data-name="2">
      <div aria-hidden="true" className="absolute border-2 border-[#9729f8] border-solid inset-0 pointer-events-none rounded-[10000px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8925e2] text-[16px] text-center w-[7px] whitespace-pre-wrap">3</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Component2 />
      <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Assinaturas</p>
    </div>
  );
}

function AssinaturasAdicionadas() {
  return (
    <div className="bg-[#e7f1ff] content-stretch flex gap-[9px] items-center not-italic p-[16px] relative rounded-[8px] shrink-0 text-[16px]" data-name="Assinaturas adicionadas">
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] relative shrink-0 text-[#0c64e6]">0</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6d7379]">Assinaturas adicionadas</p>
    </div>
  );
}

function Info() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="info">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="info">
          <mask height="24" id="mask0_3_3078" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_3078)">
            <path d={svgPaths.p399ee200} fill="var(--fill-0, #42494F)" id="info_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Info />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-h-px min-w-px not-italic relative text-[#42494f] text-[0px] text-[16px] whitespace-pre-wrap">
        <span className="leading-[normal]">{`Para adicionar um local de assinatura, `}</span>
        <span className="font-['Lufga:Bold',sans-serif] leading-[normal]">{`clique com o botão direito `}</span>
        <span className="leading-[normal]">em alguma parte do documento a esquerda.</span>
      </p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Frame20 />
      <AssinaturasAdicionadas />
      <Frame17 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[420px]">
      <Frame19 />
      <Frame9 />
      <Frame16 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full z-[1]">
      <Frame12 />
      <Frame11 />
    </div>
  );
}

export default function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] isolate items-center px-[24px] py-[50px] relative size-full">
      <Title />
      <Frame14 />
    </div>
  );
}