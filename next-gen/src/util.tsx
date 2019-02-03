
export function shuffle_list(l: any[])
{
    for (let i = 0; i < l.length-1; i++)
    {
        // Based on https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Implementation_errors
        let switch_index = i + Math.floor(Math.random() * (l.length - i));
        let tmp = l[switch_index];
        l[switch_index] = l[i];
        l[i] = tmp;
    }
}