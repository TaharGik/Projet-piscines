import useSEO from '../hooks/useSEO';

/**
 * Page Politique de Confidentialité
 * Conforme au RGPD (Règlement Général sur la Protection des Données)
 */
const Confidentialite = () => {
  useSEO({
    title: 'Politique de confidentialité',
    description: 'Politique de confidentialité et protection des données personnelles du site BBH SERVICE - Conforme au RGPD.',
    canonicalUrl: 'https://www.bbhservice.fr/confidentialite',
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold">Politique de confidentialité</h1>
          <p className="text-blue-100 mt-2">Protection de vos données personnelles</p>
        </div>
      </section>

      {/* Contenu */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            
            {/* Introduction */}
            <div className="mb-10">
              <p className="text-gray-600 text-lg leading-relaxed">
                BBH SERVICE accorde une grande importance à la protection de vos données personnelles. 
                Cette politique de confidentialité vous informe sur la manière dont nous collectons, 
                utilisons et protégeons vos informations conformément au Règlement Général sur la 
                Protection des Données (RGPD).
              </p>
            </div>

            {/* Responsable du traitement */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Responsable du traitement</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="mb-2"><strong>Raison sociale :</strong> BBH SERVICE</p>
                <p className="mb-2"><strong>Adresse :</strong> [Adresse à compléter]</p>
                <p className="mb-0"><strong>Email :</strong> <a href="mailto:bbhservice25@gmail.com" className="text-blue-600 hover:underline">bbhservice25@gmail.com</a></p>
              </div>
            </div>

            {/* Données collectées */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Données collectées</h2>
              <p className="text-gray-600 mb-4">
                Dans le cadre de notre activité, nous sommes amenés à collecter les données suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li><strong>Données d'identification :</strong> nom, prénom</li>
                <li><strong>Données de contact :</strong> adresse email, numéro de téléphone, ville/code postal</li>
                <li><strong>Données relatives à votre projet :</strong> type de projet, description, budget estimé</li>
                <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées (via cookies)</li>
              </ul>
            </div>

            {/* Finalités */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalités du traitement</h2>
              <p className="text-gray-600 mb-4">Vos données sont collectées pour les finalités suivantes :</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Répondre à vos demandes de devis et de contact</li>
                <li>Vous fournir des informations sur nos services</li>
                <li>Améliorer notre site web et nos services</li>
                <li>Respecter nos obligations légales et réglementaires</li>
                <li>Établir des statistiques de fréquentation (données anonymisées)</li>
              </ul>
            </div>

            {/* Base légale */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Base légale du traitement</h2>
              <p className="text-gray-600 mb-4">Le traitement de vos données repose sur :</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li><strong>Votre consentement</strong> lorsque vous remplissez un formulaire de contact</li>
                <li><strong>L'exécution d'un contrat</strong> ou de mesures précontractuelles</li>
                <li><strong>Notre intérêt légitime</strong> à améliorer nos services</li>
                <li><strong>Le respect d'obligations légales</strong> auxquelles nous sommes soumis</li>
              </ul>
            </div>

            {/* Destinataires */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Destinataires des données</h2>
              <p className="text-gray-600 mb-4">
                Vos données personnelles sont traitées par BBH SERVICE et peuvent être transmises à :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Nos équipes internes (commercial, technique)</li>
                <li>Nos prestataires techniques (hébergement, emails)</li>
                <li>Les autorités compétentes en cas d'obligation légale</li>
              </ul>
              <p className="text-gray-600 mt-4">
                <strong>Nous ne vendons jamais vos données à des tiers.</strong>
              </p>
            </div>

            {/* Durée de conservation */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Durée de conservation</h2>
              <p className="text-gray-600 mb-4">Vos données sont conservées pendant :</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li><strong>Données de contact :</strong> 3 ans à compter du dernier contact</li>
                <li><strong>Données de prospects :</strong> 3 ans après la collecte</li>
                <li><strong>Données clients :</strong> durée de la relation contractuelle + 5 ans (obligations légales)</li>
                <li><strong>Cookies :</strong> 13 mois maximum</li>
              </ul>
            </div>

            {/* Vos droits */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Vos droits</h2>
              <p className="text-gray-600 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">📋 Droit d'accès</h3>
                  <p className="text-gray-600 text-sm">Obtenir une copie de vos données personnelles</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">✏️ Droit de rectification</h3>
                  <p className="text-gray-600 text-sm">Corriger des données inexactes ou incomplètes</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">🗑️ Droit à l'effacement</h3>
                  <p className="text-gray-600 text-sm">Demander la suppression de vos données</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">⏸️ Droit à la limitation</h3>
                  <p className="text-gray-600 text-sm">Limiter le traitement de vos données</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">📦 Droit à la portabilité</h3>
                  <p className="text-gray-600 text-sm">Récupérer vos données dans un format structuré</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">🚫 Droit d'opposition</h3>
                  <p className="text-gray-600 text-sm">Vous opposer au traitement de vos données</p>
                </div>
              </div>
              <p className="text-gray-600 mt-6">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:bbhservice25@gmail.com" className="text-blue-600 hover:underline">bbhservice25@gmail.com</a>
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies</h2>
              <p className="text-gray-600 mb-4">
                Notre site utilise des cookies pour améliorer votre expérience de navigation :
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-600">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">Type</th>
                      <th className="px-4 py-2 text-left font-semibold">Finalité</th>
                      <th className="px-4 py-2 text-left font-semibold">Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3">Techniques</td>
                      <td className="px-4 py-3">Fonctionnement du site</td>
                      <td className="px-4 py-3">Session</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Analytics</td>
                      <td className="px-4 py-3">Statistiques de visite</td>
                      <td className="px-4 py-3">13 mois</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">hCaptcha</td>
                      <td className="px-4 py-3">Protection anti-spam</td>
                      <td className="px-4 py-3">Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 mt-4">
                Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
              </p>
            </div>

            {/* Sécurité */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Sécurité des données</h2>
              <p className="text-gray-600 mb-4">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
                protéger vos données personnelles :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Connexion sécurisée HTTPS (certificat SSL)</li>
                <li>Protection anti-spam (hCaptcha)</li>
                <li>Hébergement sécurisé chez un prestataire certifié</li>
                <li>Accès restreint aux données</li>
              </ul>
            </div>

            {/* Réclamation */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Réclamation</h2>
              <p className="text-gray-600">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une 
                réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) :
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mt-4">
                <p className="mb-2"><strong>CNIL</strong></p>
                <p className="mb-2">3 Place de Fontenoy, TSA 80715</p>
                <p className="mb-2">75334 PARIS CEDEX 07</p>
                <p className="mb-0"><a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.cnil.fr</a></p>
              </div>
            </div>

            {/* Modifications */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications</h2>
              <p className="text-gray-600">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                Les modifications entrent en vigueur dès leur publication sur le site. Nous vous encourageons 
                à consulter régulièrement cette page.
              </p>
            </div>

            {/* Date de mise à jour */}
            <div className="text-center text-gray-500 text-sm mt-12 pt-6 border-t">
              <p>Dernière mise à jour : Décembre 2025</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Confidentialite;
