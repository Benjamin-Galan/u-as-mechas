type CardProps = {
    cardTitle: string;
    cardDescription: string;
    cardImage?: string;
    cardSpan?: number | string | React.ReactNode;
    bgColor?: string;
    borderColor?: string;
    rounded?: string;
    padding?: string;
    flexDirection?: string;
    cardButton?: React.ReactNode;
    cardBadge?: React.ReactNode;
    cardList?: React.ReactNode;
    className?: string;
};

export default function Card({
    cardTitle,
    cardDescription,
    cardImage,
    cardSpan,
    bgColor = "bg-white",
    borderColor = "border-gray-300",
    rounded = "rounded-lg",
    padding = "p-4",
    flexDirection = "flex-col",
    cardButton,
    cardBadge,
    cardList,
    className = "",
}: CardProps) {
    return (
        <div className={`border ${borderColor} ${rounded} ${bgColor} shadow-sm overflow-hidden transition-colors hover:border-pink-500 ${flexDirection} ${padding}`}>
            {cardImage && (
                <div className="aspect-video w-full overflow-hidden ">
                    <img
                        src={cardImage ? cardImage : 'https://placehold.co/600x400/png'}
                        alt={cardTitle || 'Imagen del servicio'}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                </div>
            )}
            <div className="flex justify-between items-center">
                <div className="flex flex-col space-y-1.5 py-6">
                    <h3 className="text-xl font-semibold leading-none tracking-tight">{cardTitle}</h3>
                    <p className="text-sm">{cardDescription}</p>
                </div>
                {cardBadge && (
                    <div>
                        {cardBadge}
                    </div>
                )}
            </div>
            <div className={className}>
                {cardSpan && (
                    <div className="">
                        <p className="text-sm font-medium text-pink-500">${cardSpan}</p>
                    </div>
                )}
                {cardList && (
                    <div className="">
                        {cardList}
                    </div>
                )}
                {cardButton && (
                    <div className="">
                        {cardButton}
                    </div>
                )}
            </div>
        </div>
    )
}