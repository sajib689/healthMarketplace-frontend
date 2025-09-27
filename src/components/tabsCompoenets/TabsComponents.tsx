'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { JSX, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type TabItem = {
    value: string;
    label: string;
    component: JSX.Element;
};

interface SharedTabsProps {
    tabItems: TabItem[];
}

export default function SharedTabs({ tabItems }: SharedTabsProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(tabItems[0].value);

    // Sync tab with URL hash on mount
    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            setActiveTab(hash);
        }
    }, []);

    // Update URL when tab changes
    const handleTabChange = (value: string) => {
        setActiveTab(value);
        router.replace(`#${value}`);
    };

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="">
            <TabsList className="w-full mb-3 sm:mb-4 md:mb-6 lg:mb-10 overflow-x-auto">
                <div className="grid grid-flow-col auto-cols-max items-center justify-start">
                    {tabItems.map(({ value, label }) => (
                        <TabsTrigger
                            key={value}
                            value={value}
                            className="flex text-nowrap items-center justify-center gap-2 text-black hover:text-primary border-b border-transparent data-[state=active]:text-primary data-[state=active]:border-blue-400 pb-2 lg:pb-3"
                        >
                            <p className="text-nowrap lg:text-lg min-w-32 md:min-w-40">{label}</p>
                        </TabsTrigger>
                    ))}
                </div>
            </TabsList>

            {tabItems.map(({ value, component }) => (
                <TabsContent key={value} value={value}>
                    {component}
                </TabsContent>
            ))}
        </Tabs>
    );
}
