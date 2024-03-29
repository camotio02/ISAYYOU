export const FormatRelativeTime = ({ dateTimeString }) => {
    const currentDate = new Date();
    const postDate = new Date(dateTimeString?.seconds * 1000 + dateTimeString?.nanoseconds / 1e6);
    const timeDifference = currentDate.getTime() - postDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    if (secondsDifference < 60) {
        return "agora";
    } else if (minutesDifference < 60) {
        return `${minutesDifference} ${minutesDifference === 1 ? 'minuto' : 'minutos'} atrás`;
    } else if (hoursDifference < 24) {
        return `${hoursDifference} ${hoursDifference === 1 ? 'hora' : 'horas'} atrás`;
    } else if (daysDifference === 1) {
        return "ontem";
    } else {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return postDate.toLocaleDateString('pt-BR', options);
    }
}