
export const defaultImage = (img , path) =>
{
    img.onerror = "";
    img.src = path;
}