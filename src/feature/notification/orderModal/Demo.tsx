"use client"
import { useState } from 'react';
import { Modal } from '../../../components/modal/Modal';
import { Button } from '../../../components/ui/button';

const Demo = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Button onClick={() => setOpen(true)}>
                Open
            </Button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                {/* <OrderModal /> */}
                <p>fdf</p>
            </Modal>
        </div>
    );
};

export default Demo;