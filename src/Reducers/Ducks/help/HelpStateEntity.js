import {Record} from 'immutable'
import DocumentEntity from '../../Entities/DocumentEntity'

const defaultFields = {
    description: {},
    social: {},
    agreement: {},
    loading: false
}

export default class HelpStateEntity extends Record(defaultFields) {

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    loadingOn() {
        return this.set('loading', true)
    }

    /**
     * @return {Immutable.Map<string, boolean>}
     */
    loadingOff() {
        return this.set('loading', false)
    }

    /**
     * @param name
     * @param document
     * @return {Immutable.Map<K, V>}
     */
    setDocument(name, document) {
        return this.set(name, document)
    }

    /**
     * @param document
     * @return {DocumentEntity}
     */
    static setDocumentEntity(document) {
        return new DocumentEntity(document);
    }

    /**
     * @return {DocumentEntity}
     */
    getDescription() {
        return HelpStateEntity.setDocumentEntity(this.description);
    }

    /**
     * @return {DocumentEntity}
     */
    getSocial() {
        return HelpStateEntity.setDocumentEntity(this.social);
    }

    /**
     * @return {DocumentEntity}
     */
    getAgreement() {
        return HelpStateEntity.setDocumentEntity(this.agreement);
    }

    /**
     * @return {boolean}
     */
    getLoading(){
        return this.loading;
    }
}