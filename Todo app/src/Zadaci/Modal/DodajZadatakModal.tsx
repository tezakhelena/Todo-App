import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Form, FormInstance, Input, Modal, Select, Space } from "antd";
import React from "react";
import { dohvatiVaznostOptions } from "../../utils/HelperFunctions";

interface Props {
    showModal: () => void;
    open: boolean;
    dodajZadatak: () => void;
    handleCancel: () => void;
    form: FormInstance;
}

const DodajZadatakModal = (props: Props) => {

    return (
        <>
            <Button onClick={props.showModal}><PlusOutlined /></Button>
            <Modal
                title="Dodaj novi zadatak"
                open={props.open}
                onOk={props.dodajZadatak}
                onCancel={props.handleCancel}
            >
                <Form form={props.form} onFinish={props.dodajZadatak} initialValues={props.form.getFieldsValue()}>
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
                        initialValue={'niska'}
                    >
                        <Select
                            style={{ width: '100%' }}
                            options={dohvatiVaznostOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        name="rokIzvrsenja"
                        rules={[{ required: true, message: "Odaberite rok izvršenja zadatka!" }]}
                    >
                        <DatePicker
                            placeholder="Rok izvršenja"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    <Divider />

                    <Form.List name="podzadatak">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'opis']}
                                            rules={[{ required: true, message: 'Ukoliko želite podzadatak, trebate upisati opis' }]}
                                            style={{width: "100%"}} 
                                        >
                                            <Input placeholder="Opišite podzadatak" suffix={<MinusCircleOutlined onClick={() => remove(name)} />}/>
                                        </Form.Item>
                                        
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Dodaj podzadatak
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                </Form>
            </Modal>
        </>
    );
}

export default DodajZadatakModal;