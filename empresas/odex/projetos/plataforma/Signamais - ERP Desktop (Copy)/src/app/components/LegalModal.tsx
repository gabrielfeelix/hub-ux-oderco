import React from 'react';
import { X, FileText, Lock } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800 shrink-0">
          <h2 className="text-2xl font-bold text-[#212529] dark:text-white font-[Lufga,sans-serif] flex items-center gap-3">
            {type === 'terms' ? (
              <FileText className="text-[#8925e2]" size={28} />
            ) : (
              <Lock className="text-[#8925e2]" size={28} />
            )}
            {type === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-gray-50/50 dark:bg-gray-900/50">
           <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-[Lufga,sans-serif] prose-a:text-[#8925e2]">
             {type === 'terms' ? <TermsContent /> : <PrivacyContent />}
           </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-[#8925e2] text-white font-bold rounded-xl hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

function TermsContent() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Termos de Uso - Signamais</h1>
      <p className="text-sm text-gray-500 mb-8"><b>Última atualização:</b> 15 de novembro de 2024</p>
      
      <p>Bem-vindo ao <b>Signamais</b>, uma plataforma de assinatura digital desenvolvida pelo <b>Grupo Mais</b>. Ao utilizar nossos serviços, você concorda com os seguintes termos e condições.</p>

      <h2>1. Aceitação dos Termos</h2>
      <p>Ao acessar e usar o Signamais, você aceita e concorda em cumprir estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nossa plataforma.</p>

      <h2>2. Descrição do Serviço</h2>
      <p>O Signamais é uma plataforma que permite o <b>envio, recebimento e assinatura digital de documentos</b> com validade jurídica, de acordo com a legislação brasileira (MP 2.200-2/2001 e Lei 14.063/2020).</p>

      <h2>3. Cadastro e Conta</h2>
      <p>Para utilizar o Signamais, você deve:</p>
      <ul>
        <li>Fornecer informações <b>verdadeiras, precisas e atualizadas</b></li>
        <li>Manter a <b>confidencialidade</b> de sua senha</li>
        <li>Ser <b>maior de 18 anos</b> ou ter autorização de um responsável legal</li>
        <li>Notificar imediatamente o Grupo Mais sobre qualquer uso não autorizado de sua conta</li>
      </ul>

      <h2>4. Sistema de Créditos</h2>
      <p>O Signamais opera com um <b>sistema de créditos</b>:</p>
      <ul>
        <li>Cada envelope enviado consome <b>1 crédito</b></li>
        <li>Créditos são <b>pré-pagos e não reembolsáveis</b></li>
        <li>Créditos <b>não expiram</b>, exceto em caso de encerramento da conta</li>
        <li>O Grupo Mais reserva-se o direito de alterar o valor dos créditos mediante aviso prévio de 30 dias</li>
      </ul>

      <h2>5. Validade Jurídica das Assinaturas</h2>
      <p>As assinaturas eletrônicas realizadas através do Signamais possuem <b>validade jurídica</b> conforme:</p>
      <ul>
        <li><b>MP 2.200-2/2001</b> - Institui a Infraestrutura de Chaves Públicas Brasileira (ICP-Brasil)</li>
        <li><b>Lei 14.063/2020</b> - Dispõe sobre o uso de assinaturas eletrônicas em interações com entes públicos</li>
      </ul>
      <p>O Signamais utiliza <b>assinatura eletrônica avançada</b>, garantindo autenticidade, integridade e não-repúdio dos documentos.</p>

      <h2>6. Responsabilidades do Usuário</h2>
      <p>Ao usar o Signamais, você concorda em:</p>
      <ul>
        <li><b>Não</b> utilizar a plataforma para fins ilegais ou fraudulentos</li>
        <li><b>Não</b> enviar documentos com conteúdo ofensivo, discriminatório ou ilegal</li>
        <li><b>Não</b> tentar burlar o sistema de créditos ou segurança da plataforma</li>
        <li>Respeitar os direitos de propriedade intelectual de terceiros</li>
        <li>Usar a plataforma apenas para fins lícitos e de acordo com estes Termos</li>
      </ul>

      <h2>7. Armazenamento de Documentos</h2>
      <p>Os documentos enviados através do Signamais são armazenados com <b>criptografia de ponta</b> e mantidos por um período de:</p>
      <ul>
        <li><b>5 anos</b> para documentos concluídos (assinados por todas as partes)</li>
        <li><b>90 dias</b> para documentos não concluídos (expirados ou cancelados)</li>
      </ul>
      <p>Após esse período, os documentos são <b>permanentemente excluídos</b> de nossos servidores.</p>

      <h2>8. Privacidade e Proteção de Dados</h2>
      <p>O tratamento de seus dados pessoais é regido por nossa <b>Política de Privacidade</b>, em conformidade com a <b>Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018)</b>.</p>

      <h2>9. Limitação de Responsabilidade</h2>
      <p>O Signamais e o Grupo Mais <b>não se responsabilizam</b> por:</p>
      <ul>
        <li>Conteúdo dos documentos enviados pelos usuários</li>
        <li>Uso indevido da plataforma por terceiros</li>
        <li>Perdas ou danos resultantes de falhas técnicas, desde que tenham sido tomadas medidas razoáveis de prevenção</li>
        <li>Interrupções temporárias do serviço para manutenção</li>
      </ul>

      <h2>10. Cancelamento e Suspensão</h2>
      <p>O Grupo Mais reserva-se o direito de:</p>
      <ul>
        <li><b>Suspender ou encerrar</b> contas que violem estes Termos</li>
        <li><b>Modificar ou descontinuar</b> o serviço mediante aviso prévio de 60 dias</li>
        <li><b>Recusar serviço</b> a qualquer pessoa, por qualquer motivo, a qualquer momento</li>
      </ul>

      <h2>11. Modificações dos Termos</h2>
      <p>O Grupo Mais pode modificar estes Termos a qualquer momento. As alterações entrarão em vigor <b>imediatamente</b> após a publicação na plataforma. O uso continuado do Signamais após as modificações constitui aceitação dos novos termos.</p>

      <h2>12. Lei Aplicável e Foro</h2>
      <p>Estes Termos são regidos pelas leis da <b>República Federativa do Brasil</b>. Fica eleito o foro da comarca de <b>Maringá/PR</b> para dirimir quaisquer controvérsias decorrentes deste documento.</p>

      <h2>13. Contato</h2>
      <p>Para questões sobre estes Termos, entre em contato:</p>
      <ul>
        <li><b>Email:</b> juridico@signamais.com.br</li>
        <li><b>Telefone:</b> (44) 3030-3030</li>
        <li><b>Endereço:</b> Av. Brasil, 1234 - Maringá/PR - CEP 87000-000</li>
      </ul>
      <br/>
      <p className="text-sm"><b>Grupo Mais Tecnologia Ltda.</b><br/>CNPJ: 12.345.678/0001-90</p>
    </>
  );
}

function PrivacyContent() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Política de Privacidade - Signamais</h1>
      <p className="text-sm text-gray-500 mb-8"><b>Última atualização:</b> 15 de novembro de 2024</p>
      
      <p>O <b>Grupo Mais</b>, através da plataforma <b>Signamais</b>, está comprometido em proteger sua privacidade e seus dados pessoais. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações, em conformidade com a <b>Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018)</b>.</p>

      <h2>1. Dados Coletados</h2>
      <p>Coletamos os seguintes tipos de dados:</p>

      <h3>1.1. Dados Fornecidos por Você</h3>
      <ul>
        <li><b>Dados cadastrais:</b> nome completo, email, telefone, CPF/CNPJ</li>
        <li><b>Dados de acesso:</b> senha (armazenada com hash criptográfico)</li>
        <li><b>Documentos:</b> PDFs e arquivos enviados para assinatura</li>
        <li><b>Assinatura digital:</b> imagem ou representação gráfica de sua assinatura</li>
        <li><b>Dados de pagamento:</b> informações de cartão de crédito (processadas por parceiros certificados PCI-DSS)</li>
      </ul>

      <h3>1.2. Dados Coletados Automaticamente</h3>
      <ul>
        <li><b>Dados de navegação:</b> endereço IP, navegador, sistema operacional</li>
        <li><b>Dados de uso:</b> páginas visitadas, tempo de navegação, cliques</li>
        <li><b>Cookies:</b> identificadores únicos para manter sua sessão ativa</li>
        <li><b>Logs de auditoria:</b> data/hora de cada ação realizada na plataforma</li>
      </ul>

      <h2>2. Finalidade do Tratamento de Dados</h2>
      <p>Utilizamos seus dados para:</p>
      <ul>
        <li><b>Prestação do serviço:</b> permitir o envio e assinatura de documentos</li>
        <li><b>Autenticação:</b> verificar sua identidade e prevenir fraudes</li>
        <li><b>Comunicação:</b> enviar notificações sobre documentos e atualizações do sistema</li>
        <li><b>Cobrança:</b> processar pagamentos e emitir notas fiscais</li>
        <li><b>Melhoria do serviço:</b> analisar padrões de uso e melhorar a experiência</li>
        <li><b>Cumprimento legal:</b> atender obrigações legais e regulatórias</li>
        <li><b>Segurança:</b> detectar e prevenir atividades maliciosas</li>
      </ul>

      <h2>3. Base Legal para o Tratamento</h2>
      <p>Tratamos seus dados com base em:</p>
      <ul>
        <li><b>Consentimento:</b> você consente ao aceitar estes termos</li>
        <li><b>Execução de contrato:</b> necessário para prestar o serviço contratado</li>
        <li><b>Obrigação legal:</b> cumprimento de exigências legais (ex: emissão de nota fiscal)</li>
        <li><b>Legítimo interesse:</b> prevenção de fraudes e melhoria do serviço</li>
      </ul>

      <h2>4. Compartilhamento de Dados</h2>
      <p>Seus dados podem ser compartilhados com:</p>

      <h3>4.1. Parceiros de Serviço</h3>
      <ul>
        <li><b>Provedores de pagamento:</b> para processar transações financeiras</li>
        <li><b>Serviços de hospedagem:</b> Amazon Web Services (AWS) ou similar</li>
        <li><b>Serviços de email:</b> para envio de notificações transacionais</li>
      </ul>

      <h3>4.2. Autoridades Legais</h3>
      <p>Podemos compartilhar dados com autoridades quando <b>exigido por lei</b> ou para:</p>
      <ul>
        <li>Cumprir ordem judicial</li>
        <li>Proteger direitos, propriedade ou segurança do Grupo Mais ou de terceiros</li>
        <li>Prevenir fraudes ou atividades ilegais</li>
      </ul>

      <h3>4.3. Outras Partes dos Documentos</h3>
      <p>Dados necessários para a assinatura de documentos (nome, email) são compartilhados com os demais signatários do envelope.</p>

      <h2>5. Armazenamento e Segurança</h2>
      <p>Adotamos as seguintes medidas de segurança:</p>
      <ul>
        <li><b>Criptografia:</b> dados em trânsito (HTTPS/TLS) e em repouso (AES-256)</li>
        <li><b>Controle de acesso:</b> apenas funcionários autorizados têm acesso aos dados</li>
        <li><b>Backup:</b> cópias de segurança diárias, armazenadas de forma criptografada</li>
        <li><b>Monitoramento:</b> sistemas de detecção de intrusão e atividades suspeitas</li>
        <li><b>Auditorias:</b> revisões periódicas de segurança</li>
      </ul>

      <p>Os dados são armazenados em servidores localizados no <b>Brasil</b>, em conformidade com a LGPD.</p>

      <h2>6. Retenção de Dados</h2>
      <p>Mantemos seus dados pelo tempo necessário para:</p>
      <ul>
        <li><b>Dados cadastrais:</b> enquanto sua conta estiver ativa, mais 5 anos após encerramento (para fins contábeis/fiscais)</li>
        <li><b>Documentos assinados:</b> 5 anos após conclusão</li>
        <li><b>Documentos não concluídos:</b> 90 dias após expiração</li>
        <li><b>Logs de auditoria:</b> 2 anos</li>
      </ul>

      <h2>7. Seus Direitos (LGPD)</h2>
      <p>Você tem direito a:</p>
      <ul>
        <li><b>Acesso:</b> solicitar cópia de seus dados pessoais</li>
        <li><b>Correção:</b> atualizar dados incorretos ou desatualizados</li>
        <li><b>Exclusão:</b> solicitar exclusão de dados (com exceções legais)</li>
        <li><b>Portabilidade:</b> receber seus dados em formato estruturado</li>
        <li><b>Revogação de consentimento:</b> retirar consentimento a qualquer momento</li>
        <li><b>Oposição:</b> opor-se ao tratamento de dados para fins específicos</li>
        <li><b>Informação:</b> saber com quem seus dados foram compartilhados</li>
      </ul>

      <p>Para exercer esses direitos, entre em contato através de: <b>privacidade@signamais.com.br</b></p>

      <h2>8. Cookies e Tecnologias Similares</h2>
      <p>Utilizamos cookies para:</p>
      <ul>
        <li><b>Cookies essenciais:</b> manter sua sessão ativa</li>
        <li><b>Cookies de desempenho:</b> analisar como você usa a plataforma</li>
        <li><b>Cookies de preferências:</b> lembrar suas configurações (ex: modo escuro)</li>
      </ul>

      <p>Você pode gerenciar cookies através das configurações do seu navegador. No entanto, desabilitar cookies essenciais pode prejudicar a funcionalidade da plataforma.</p>

      <h2>9. Transferência Internacional de Dados</h2>
      <p>Atualmente, <b>não</b> realizamos transferências internacionais de dados. Caso isso mude, você será notificado e daremos garantias adequadas de proteção.</p>

      <h2>10. Menores de Idade</h2>
      <p>O Signamais <b>não</b> é destinado a menores de 18 anos. Não coletamos intencionalmente dados de menores. Se tomarmos conhecimento de que coletamos dados de um menor, excluiremos imediatamente.</p>

      <h2>11. Alterações nesta Política</h2>
      <p>Podemos atualizar esta Política periodicamente. Notificaremos sobre mudanças significativas por email ou aviso na plataforma. A versão atualizada entrará em vigor <b>imediatamente</b> após publicação.</p>

      <h2>12. Encarregado de Dados (DPO)</h2>
      <p>Nosso Encarregado de Proteção de Dados pode ser contatado em:</p>
      <ul>
        <li><b>Email:</b> dpo@signamais.com.br</li>
        <li><b>Telefone:</b> (44) 3030-3030</li>
      </ul>

      <h2>13. Contato</h2>
      <p>Para dúvidas sobre esta Política de Privacidade:</p>
      <ul>
        <li><b>Email:</b> privacidade@signamais.com.br</li>
        <li><b>Telefone:</b> (44) 3030-3030</li>
        <li><b>Endereço:</b> Av. Brasil, 1234 - Maringá/PR - CEP 87000-000</li>
      </ul>
      <br/>
      <p className="text-sm"><b>Grupo Mais Tecnologia Ltda.</b><br/>CNPJ: 12.345.678/0001-90</p>
    </>
  );
}
