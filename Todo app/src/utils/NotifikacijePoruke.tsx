export const NASLOV_ROK_ISTEKA = () => {
    return "Istek roka izvršenja zadatka";
}

export const ROK_ISTJECE_SUTRA = (naslov?: string) => {
    return `Rok izvršenja zadatka "${naslov}" ističe sutra.`;
}

export const ROK_ISTJECE_DANAS = (naslov?: string) => {
    return `Rok izvršenja zadatka "${naslov}" ističe danas.`;
}