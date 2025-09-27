interface TagProps {
    name: string;
}

export const Tag = ({ name }: TagProps) => {
    return (
        <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
            {name}
        </span>
    );
};