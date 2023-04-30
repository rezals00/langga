export interface ResultAlodok {
    status:           string;
    status_code:      number;
    result:           Result;
    maximum_quantity: number;
}

export interface Result {
    data:        Datum[];
    total_pages: number;
    total_count: number;
    page:        number;
}

export interface Datum {
    id:                             string;
    type:                           Type;
    name:                           string;
    alodokter_sku:                  string;
    pack:                           string;
    unit_in_pack:                   string;
    drug_classification:            DrugClassification;
    drug_classification_value:      number;
    drug_classification_icon:       string;
    drug_classification_label:      DrugClassificationLabel;
    global_percentage_availibility: number;
    thumbnail_image:                string;
    rx_drug_bottomsheet_message:    RxDrugBottomsheetMessage;
    tiny_image:                     string;
    drugs_categories:               DrugsCategory[];
    generic:                        Generic;
    manufacturer:                   Manufacturer;
    exclusion_tags:                 ExclusionTag[] | null;
    product_pharmacy:               ProductPharmacy;
    rx_drug_warning_title:          string;
    rx_drug_warning_message:        string;
    price:                          Price;
    stock:                          number;
    rating:                         string;
    total_rated_amount:             string;
    total_product_sold:             string;
    selected_warehouse:             SelectedWarehouse;
}

export enum DrugClassification {
    ObatBebas = "obat_bebas",
    ObatBebasTerbatas = "obat_bebas_terbatas",
}

export enum DrugClassificationLabel {
    ObatBebas = "Obat Bebas",
    ObatBebasTerbatas = "Obat Bebas Terbatas",
}

export interface DrugsCategory {
    id:            string;
    name:          string;
    display_order: null;
}

export interface ExclusionTag {
    id:   string;
    code: string;
}

export interface Generic {
    id:   string;
    code: string;
    name: string;
}

export interface Manufacturer {
    id:   string;
    name: string;
}

export interface Price {
    amount:         number;
    display_amount: string;
    title:          string;
    iso_code:       ISOCode;
}

export enum ISOCode {
    Idr = "IDR",
}

export interface ProductPharmacy {
    id:          string;
    name:        Name;
    pharmacy_id: PharmacyID;
}

export enum Name {
    Century = "Century",
    Java = "Java",
    K24 = "K24",
}

export enum PharmacyID {
    The5Fad17Cb41Ab591A50653A8D = "5fad17cb41ab591a50653a8d",
    The61A9B7506368Fd08Cfd63C20 = "61a9b7506368fd08cfd63c20",
    The6287096Ef15Ee87Fe15256Aa = "6287096ef15ee87fe15256aa",
}

export interface RxDrugBottomsheetMessage {
    title:                Title;
    messages:             Message[];
    upload_button_title:  UploadButtonTitle;
    request_button_title: RequestButtonTitle;
}

export interface Message {
    picture_url: string;
    message:     string;
}

export enum RequestButtonTitle {
    MintaResepObat = "Minta Resep Obat",
}

export enum Title {
    ObatKerasIniMemerlukanResepDokter = "Obat Keras Ini Memerlukan Resep Dokter",
}

export enum UploadButtonTitle {
    UploadResepObat = "Upload Resep Obat",
}

export interface SelectedWarehouse {
    warehouse_id:                 WarehouseID;
    warehouse_name:               WarehouseName;
    is_open_24h:                  boolean;
    is_instant_courier_available: boolean;
    instant_courier_etd_hour:     string;
}

export enum WarehouseID {
    The60Ea4D7E506Cbb51B8Cbc3De = "60ea4d7e506cbb51b8cbc3de",
    The628Af8F9F15Ee8699E3Df296 = "628af8f9f15ee8699e3df296",
    The628C8146F15Ee8403F6Bf64B = "628c8146f15ee8403f6bf64b",
}

export enum WarehouseName {
    CenturyPlazaSenayan = "Century Plaza Senayan",
    K24KolonelSugionoBanyuwangi = "K-24 Kolonel Sugiono Banyuwangi",
    K24SatelitPucangGading = "K-24 Satelit Pucang Gading",
}

export enum Type {
    Products = "products",
}
