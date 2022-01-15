import { ToolbarIdConfig } from "@/types";
import { PDF_FILE_INPUT_ID } from "@/utils/constants";

const getEl = document.getElementById.bind(document);

export default (idConfig: ToolbarIdConfig = {}, idPrefix: string) => ({
  appContainer: getEl(idPrefix + "pdf"),
  mainContainer: getEl(idPrefix + "viewerContainer"),
  viewerContainer: getEl(idPrefix + "viewer"),
  eventBus: null,
  toolbar: {
    container: getEl(idPrefix + "toolbarViewer"),
    numPages: getEl(idConfig.numPages || idPrefix + "numPages"),
    pageNumber: getEl(idConfig.pageNumber || idPrefix + "pageNumber"),
    // TODO make scale select customizable
    scaleSelectContainer: getEl(idPrefix + "scaleSelectContainer"),
    scaleSelect: getEl(idPrefix + "scaleSelect"),
    customScaleOption: getEl(idPrefix + "customScaleOption"),
    previous: getEl(idConfig.previousPage || idPrefix + "previous"),
    next: getEl(idConfig.nextPage || idPrefix + "next"),
    zoomIn: getEl(idConfig.zoomIn || idPrefix + "zoomIn"),
    zoomOut: getEl(idConfig.zoomOut || idPrefix + "zoomOut"),
    viewFind: getEl(idConfig.toggleFindbar || idPrefix + "viewFind"),
    openFile: getEl(idConfig.openFile || idPrefix + "openFile"),
    print: getEl(idConfig.print || idPrefix + "print"),
    presentationModeButton: getEl(
        idConfig.presentationMode || idPrefix + "presentationMode"),
    download: getEl(idConfig.download || idPrefix + "download"),
    viewBookmark: getEl(idConfig.viewBookmark || idPrefix + "viewBookmark")
  },
  secondaryToolbar: {
    toolbar: getEl(idPrefix + "secondaryToolbar"),
    toggleButton: getEl(idPrefix + "secondaryToolbarToggle"),
    toolbarButtonContainer: getEl(idPrefix + "secondaryToolbarButtonContainer"),
    presentationModeButton: getEl(idPrefix + "secondaryPresentationMode"),
    openFileButton: getEl(idPrefix + "secondaryOpenFile"),
    printButton: getEl(idPrefix + "secondaryPrint"),
    downloadButton: getEl(idPrefix + "secondaryDownload"),
    viewBookmarkButton: getEl(idPrefix + "secondaryViewBookmark"),
    firstPageButton: getEl(idConfig.firstPage || idPrefix + "firstPage"),
    lastPageButton: getEl(idConfig.lastPage || idPrefix + "lastPage"),
    pageRotateCwButton: getEl(idConfig.pageRotateCw || idPrefix + "pageRotateCw"),
    pageRotateCcwButton: getEl(idConfig.pageRotateCcw || idPrefix + "pageRotateCcw"),
    cursorSelectToolButton: getEl(
      idConfig.cursorSelectTool || idPrefix + "cursorSelectTool"
    ),
    cursorHandToolButton: getEl(idConfig.cursorHandTool || idPrefix + "cursorHandTool"),
    scrollVerticalButton: getEl(idConfig.scrollVertical || idPrefix + "scrollVertical"),
    scrollHorizontalButton: getEl(
      idConfig.scrollHorizontal || idPrefix + "scrollHorizontal"
    ),
    scrollWrappedButton: getEl(idConfig.scrollWrapped || idPrefix + "scrollWrapped"),
    spreadNoneButton: getEl(idConfig.spreadNone || idPrefix + "spreadNone"),
    spreadOddButton: getEl(idConfig.spreadOdd || idPrefix + "spreadOdd"),
    spreadEvenButton: getEl(idConfig.spreadEven || idPrefix + "spreadEven"),
    documentPropertiesButton: getEl(
      idConfig.documentProperties || idPrefix + "documentProperties"
    )
  },
  fullscreen: {
    contextFirstPage: getEl(idPrefix + "contextFirstPage"),
    contextLastPage: getEl(idPrefix + "contextLastPage"),
    contextPageRotateCw: getEl(idPrefix + "contextPageRotateCw"),
    contextPageRotateCcw: getEl(idPrefix + "contextPageRotateCcw")
  },
  sidebar: {
    // Divs (and sidebar button)
    outerContainer: getEl(idPrefix + "outerContainer"),
    viewerContainer: getEl(idPrefix + "viewerContainer"),
    toggleButton: getEl(idConfig.sidebarToggle || idPrefix + "sidebarToggle"),
    // Buttons
    thumbnailButton: getEl(idConfig.viewThumbnail || idPrefix + "viewThumbnail"),
    outlineButton: getEl(idConfig.viewOutline || idPrefix + "viewOutline"),
    attachmentsButton: getEl(idConfig.viewAttachments || idPrefix + "viewAttachments"),
    // Views
    thumbnailView: getEl(idPrefix + "thumbnailView"),
    outlineView: getEl(idPrefix + "outlineView"),
    attachmentsView: getEl(idPrefix + "attachmentsView")
  },
  sidebarResizer: {
    outerContainer: getEl(idPrefix + "outerContainer"),
    resizer: getEl(idPrefix + "sidebarResizer")
  },
  findBar: {
    bar: getEl(idConfig.findbar || idPrefix + "findbar"),
    toggleButton: getEl(idConfig.toggleFindbar || idPrefix + "viewFind"),
    findField: getEl(idConfig.findInput || idPrefix + "findInput"),
    highlightAllCheckbox: getEl(
      idConfig.findHighlightAll || idPrefix + "findHighlightAll"
    ),
    caseSensitiveCheckbox: getEl(idConfig.findMatchCase || idPrefix + "findMatchCase"),
    entireWordCheckbox: getEl(idConfig.findEntireWord || idPrefix + "findEntireWord"),
    findMsg: getEl(idConfig.findMessage || idPrefix + "findMsg"),
    findResultsCount: getEl(idConfig.findResultsCount || idPrefix + "findResultsCount"),
    findPreviousButton: getEl(idConfig.findPrevious || idPrefix + "findPrevious"),
    findNextButton: getEl(idConfig.findNext || idPrefix + "findNext")
  },
  passwordOverlay: {
    overlayName: "passwordOverlay",
    container: getEl(idPrefix + "passwordOverlay"),
    label: getEl(idPrefix + "passwordText"),
    input: getEl(idPrefix + "password"),
    submitButton: getEl(idPrefix + "passwordSubmit"),
    cancelButton: getEl(idPrefix + "passwordCancel")
  },
  documentProperties: {
    overlayName: "documentPropertiesOverlay",
    container: getEl(idPrefix + "documentPropertiesOverlay"),
    closeButton: getEl(idPrefix + "documentPropertiesClose"),
    fields: {
      fileName: getEl(idPrefix + "fileNameField"),
      fileSize: getEl(idPrefix + "fileSizeField"),
      title: getEl(idPrefix + "titleField"),
      author: getEl(idPrefix + "authorField"),
      subject: getEl(idPrefix + "subjectField"),
      keywords: getEl(idPrefix + "keywordsField"),
      creationDate: getEl(idPrefix + "creationDateField"),
      modificationDate: getEl(idPrefix + "modificationDateField"),
      creator: getEl(idPrefix + "creatorField"),
      producer: getEl(idPrefix + "producerField"),
      version: getEl(idPrefix + "versionField"),
      pageCount: getEl(idPrefix + "pageCountField"),
      pageSize: getEl(idPrefix + "pageSizeField"),
      linearized: getEl(idPrefix + "linearizedField")
    }
  },
  errorWrapper: {
    container: getEl(idPrefix + "errorWrapper"),
    errorMessage: getEl(idPrefix + "errorMessage"),
    closeButton: getEl(idPrefix + "errorClose"),
    errorMoreInfo: getEl(idPrefix + "errorMoreInfo"),
    moreInfoButton: getEl(idPrefix + "errorShowMore"),
    lessInfoButton: getEl(idPrefix + "errorShowLess")
  },
  printContainer: getEl(idPrefix + "printContainer"),
  openFileInputName: PDF_FILE_INPUT_ID
});
