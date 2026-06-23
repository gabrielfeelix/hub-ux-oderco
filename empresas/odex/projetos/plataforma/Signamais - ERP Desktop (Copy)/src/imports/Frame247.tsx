import svgPaths from "./svg-g20tbljsbt";
import imgHttpsLottiefilesComAnimationsLoadingP2Dxatbofs from "figma:asset/5de07d34715275259bebfec7783dc51736fc9e6c.png";

function Frame4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <p className="font-['Segoe_UI:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#212529] text-[20px]">Tem certeza que deseja enviar sem posicionar assinatura(s)?</p>
    </div>
  );
}

function MaterialSymbolsClose() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:close">
          <path d={svgPaths.p2edaeb50} fill="var(--fill-0, #212529)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame4 />
      <MaterialSymbolsClose />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#edeeee] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[24px] pt-[32px] px-[32px] relative w-full">
        <Frame3 />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex items-start px-[32px] py-[24px] relative w-full">
        <p className="font-['Segoe_UI:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#495057] text-[16px]">Após enviado não será possível adicionar assinaturas manualmente.</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[8px] h-[56px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[#abafb2] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6d7379] text-[16px]">Fechar</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#b970fa] content-stretch flex h-[56px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <div className="relative shrink-0 size-[38px]" data-name="https://lottiefiles.com/animations/loading-p2DXATBOFS">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHttpsLottiefilesComAnimationsLoadingP2Dxatbofs} />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-start justify-end px-[32px] py-[24px] relative w-full">
          <Button />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

export default function Frame5() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[16px] size-full">
      <Frame />
      <Frame1 />
      <Frame2 />
    </div>
  );
}