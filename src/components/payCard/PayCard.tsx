import payImage from "@/assets/pay/payImage.png";
import Image from 'next/image';
const PayCard = ({ title, subTitle, amount, button, nextPhase }: { title: string, subTitle: string, amount: number, button: string, nextPhase: () => void }) => {
    return (
        <div className='flex flex-col items-center justify-center space-y-3 p-4'>
            <p className='text-3xl font-semibold'>{title}</p>
            <p className=''>{subTitle}</p>
            <div className='flex items-center justify-center'>
                <Image alt='' src={payImage} width={300} height={300} className='object-contain size-40' />
            </div>
            <p className='text-3xl font-bold'>${amount}</p>

            <button
                onClick={nextPhase}
                className="w-full px-6 py-2 bg-secondary/80 hover:bg-secondary text-white font-medium rounded-xl transition-colors"
            >
                {button}
            </button>

        </div>
    );
};

export default PayCard;