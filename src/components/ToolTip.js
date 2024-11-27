export default function Tooltip({ message, children }) {
    return (
        <div class="group relative flex cursor-pointer">
            {children}
            <span class="absolute top-5 scale-0 transition-all w-max rounded bg-gray-800 p-2 text-xs font-normal text-white group-hover:scale-100">{message}</span>
        </div>
    )
}