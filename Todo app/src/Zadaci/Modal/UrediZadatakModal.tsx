import { DatePicker, Form, FormInstance, Input, Modal, Select } from "antd";
import { Moment } from "moment";
import generateConfig from 'rc-picker/lib/generate/moment';
import React from "react";
import { dohvatiVaznostOptions } from "../../utils/HelperFunctions";


interface Props {
    open: boolean;
    urediZadatak: () => void;
    handleCancel: () => void;
    form: FormInstance;
    vaznost?: string;
}

const UrediZadatakModal = (props: Props) => {

    const MyDatePicker = DatePicker.generatePicker<Moment>(generateConfig);
    
    return (
        <>
            <Modal
                title="Uredi zadatak"
                open={props.open}
                onOk={props.urediZadatak}
                onCancel={props.handleCancel}
            >
                <Form form={props.form} onFinish={props.urediZadatak}>
                    <Form.Item
                        name="naslov"
                        rules={[{ required: true, message: "Unesite naslov zadatka!" }]}
                    >
                        <Input placeholder="Naslov zadatka" />
                    </Form.Item>
                    <Form.Item
                        name="opis"
                        rules={[{ required: true, message: "Unesite opis zadatka!" }]}
                    >
                        <Input placeholder="Opis zadatka" />
                    </Form.Item>
                    <Form.Item
                        name="vaznostZadatka"
                    >
                        <Select
                            defaultValue={props.vaznost}
                            style={{ width: '100%' }}
                            options={dohvatiVaznostOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        name="rokIzvrsenja"
                        rules={[{ required: true, message: "Odaberite rok izvršenja zadatka!" }]}
                    >
                        <MyDatePicker
                            placeholder="Rok izvršenja"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default UrediZadatakModal;