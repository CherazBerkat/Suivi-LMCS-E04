export function convertNomComplet(nomcomplet) {
    // Divise le nom complet en parties séparées par un espace
    const parts = nomcomplet.split(' ');
    let prenom = '';
    let nom = '';
    // Vérifie s'il y a plus d'une partie dans le nom complet
    if (parts.length > 1) {
        // Le dernier élément est considéré comme le nom de famille
        nom = parts[parts.length - 1];
        // Les autres parties sont considérées comme le prénom
        prenom = parts.slice(0, parts.length - 1).join(' ');
    } else {
        // Si une seule partie est présente, elle est considérée comme le nom
        nom = parts[0];
    }
    // Retourne le prénom et le nom sous forme d'objet
    return { prenom, nom };
}
