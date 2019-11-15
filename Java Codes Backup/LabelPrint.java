// 1. Use Windows Default Printer
import javax.print.Doc;
import javax.print.DocFlavor;
import javax.print.DocPrintJob;
import javax.print.PrintException;
import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import javax.print.SimpleDoc;
/**
 * @author gongchang
 * 描述：本机调用条码打印机
 * 时间：2015年11月12日 下午1:49:15
 */
public class LookupDefaultPrinter {
 public static void runPrint(String str) throws PrintException {
  //确保条码打印机为默认打印机
  PrintService printer = PrintServiceLookup.lookupDefaultPrintService();
  if (printer == null) {
   System.out.println("没有发现条码打印机.");
   return;
  }
  DocPrintJob job = printer.createPrintJob();
  byte[] by = str.getBytes();
  DocFlavor flavor = DocFlavor.BYTE_ARRAY.AUTOSENSE;
  Doc doc = new SimpleDoc(by, flavor, null);
  job.print(doc, null);
 }
 
 public static void main(String[] args) throws PrintException {
  String str = "Hello";
  int x = 10 , y = 100, h = 30, w = 30;
  String zpl = 
    "^XA"+ 
    "^FO"+x+","+y+"^A0,"+h+","+w+"^FD"+str+"^FS"+
    "^XZ";
  runPrint(zpl);
 }
}


// 2. Use Network Printer
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Socket;
import java.net.UnknownHostException;
/**
 * @author gongchang
 * 描述：Socket调用条码打印机
 * 时间：2015年11月12日 下午1:48:37
 */
public class SocketPrinter {
 private static String ip = "192.168.0.111";
 private static Integer port = 9100;
 public static void runPrint(String str) throws UnknownHostException,IOException {
  // 确保条码打印机ip已经设置好，能够ping通
  Socket socket = new Socket(ip, port);
  DataOutputStream outToServer = new DataOutputStream(socket.getOutputStream());
  outToServer.writeUTF(str);
  socket.close();
 }
 public static void main(String[] args) throws Exception {
  // pingIp();
  String str = "Hello";
  int x = 10, y = 100, h = 30, w = 30;
  String zpl = "^XA" + "^FO" + x + "," + y + "^A0," + h + "," + w + "^FD"
    + str + "^FS" + "^XZ";
  runPrint(zpl);
 }
 /**
  * 功能：检测IP能否ping 通
  */
 public static boolean pingIp() {
  Runtime runtime = Runtime.getRuntime(); // 获取当前程序的运行进对象
  Process process = null; // 声明处理类对象
  String line = null; // 返回行信息
  InputStream is = null; // 输入流
  InputStreamReader isr = null; // 字节流
  BufferedReader br = null;
  boolean res = false;// 结果
  try {
   process = runtime.exec("ping " + ip); // PING
   is = process.getInputStream(); // 实例化输入流
   isr = new InputStreamReader(is);// 把输入流转换成字节流
   br = new BufferedReader(isr);// 从字节中读取文本
   while ((line = br.readLine()) != null) {
    if (line.contains("TTL")) {
     res = true;
     break;
    }
   }
   is.close();
   isr.close();
   br.close();
   if (res) {
    System.out.println("ping 通  ...");
    return true;
   } else {
    System.out.println("ping 不通...");
    return false;
   }
  } catch (IOException e) {
   System.out.println(e);
   runtime.exit(1);
  }
  return false;
 }
}
