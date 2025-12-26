import useSEO from '../hooks/useSEO';

/**
 * Page Mentions Légales
 * Informations légales obligatoires pour un site professionnel
 */
const MentionsLegales = () => {
  useSEO({
    title: 'Mentions légales',
    description: 'Mentions légales du site BBH SERVICE - Informations sur l\'éditeur, l\'hébergeur et les conditions d\'utilisation.',
    canonicalUrl: 'https://www.bbhservice.fr/mentions-legales',
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold">Mentions légales</h1>
        </div>
      </section>

      {/* Contenu */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-lg">
            
            {/* Éditeur */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Éditeur du site</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="mb-2"><strong>Raison sociale :</strong> BBH SERVICE</p>
                <p className="mb-2"><strong>Forme juridique :</strong> [À compléter - Ex: SARL, SAS, Auto-entrepreneur]</p>
                <p className="mb-2"><strong>Capital social :</strong> [À compléter]</p>
                <p className="mb-2"><strong>Siège social :</strong> [Adresse à compléter]</p>
                <p className="mb-2"><strong>SIRET :</strong> [Numéro SIRET à compléter]</p>
                <p className="mb-2"><strong>RCS :</strong> [Numéro RCS à compléter]</p>
                <p className="mb-2"><strong>Téléphone :</strong> <a href="tel:+33640123456" className="text-blue-600 hover:underline">06 40 12 34 56</a></p>
                <p className="mb-2"><strong>Email :</strong> <a href="mailto:bbhservice25@gmail.com" className="text-blue-600 hover:underline">bbhservice25@gmail.com</a></p>
                <p className="mb-0"><strong>Directeur de la publication :</strong> [Nom du dirigeant à compléter]</p>
              </div>
            </div>

            {/* Hébergeur */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hébergement</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="mb-2"><strong>Hébergeur :</strong> Vercel Inc.</p>
                <p className="mb-2"><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                <p className="mb-0"><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://vercel.com</a></p>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
              <p className="text-gray-600 mb-4">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour 
                les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="text-gray-600">
                La reproduction de tout ou partie de ce site sur un support électronique ou autre quel qu'il soit, 
                est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </div>

            {/* Responsabilité */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation de responsabilité</h2>
              <p className="text-gray-600 mb-4">
                Les informations contenues sur ce site sont aussi précises que possibles et le site est 
                périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions 
                ou des lacunes. Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
                merci de bien vouloir le signaler par email à l'adresse <a href="mailto:bbhservice25@gmail.com" className="text-blue-600 hover:underline">bbhservice25@gmail.com</a>.
              </p>
              <p className="text-gray-600">
                BBH SERVICE ne pourra être tenue responsable des dommages directs et indirects causés au 
                matériel de l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation d'un 
                matériel ne répondant pas aux spécifications techniques requises, soit de l'apparition d'un 
                bug ou d'une incompatibilité.
              </p>
            </div>

            {/* Liens hypertextes */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Liens hypertextes</h2>
              <p className="text-gray-600">
                Le site BBH SERVICE peut contenir des liens hypertextes vers d'autres sites présents sur 
                le réseau Internet. Les liens vers ces autres ressources vous font quitter le site BBH SERVICE. 
                Il est possible de créer un lien vers la page de présentation de ce site sans autorisation 
                expresse de l'éditeur. Aucune autorisation ou demande d'information préalable ne peut être 
                exigée par l'éditeur à l'égard d'un site qui souhaite établir un lien vers le site de l'éditeur.
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
              <p className="text-gray-600 mb-4">
                Le site BBH SERVICE peut être amené à vous demander l'acceptation des cookies pour des 
                besoins de statistiques et d'affichage. Un cookie est une information déposée sur votre 
                disque dur par le serveur du site que vous visitez.
              </p>
              <p className="text-gray-600">
                Vous pouvez refuser les cookies en configurant votre navigateur. Pour plus d'informations, 
                consultez notre <a href="/confidentialite" className="text-blue-600 hover:underline">politique de confidentialité</a>.
              </p>
            </div>

            {/* Droit applicable */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Droit applicable</h2>
              <p className="text-gray-600">
                Tant le présent site que les modalités et conditions de son utilisation sont régis par le 
                droit français, quel que soit le lieu d'utilisation. En cas de contestation éventuelle, et 
                après l'échec de toute tentative de recherche d'une solution amiable, les tribunaux français 
                seront seuls compétents pour connaître de ce litige.
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

export default MentionsLegales;
